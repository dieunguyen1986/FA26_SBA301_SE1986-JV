package fu.talenthub.modules.auth.controller;

import fu.talenthub.common.Constants;
import fu.talenthub.modules.auth.dto.CustomUserDetails;
import fu.talenthub.modules.auth.dto.LoginRequest;
import fu.talenthub.modules.auth.dto.UserResponse;
import fu.talenthub.modules.auth.security.AuthCookieProperties;
import fu.talenthub.modules.auth.security.JwtService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.Duration;
import java.util.stream.Collectors;

@RestController
@RequiredArgsConstructor
@Slf4j
@RequestMapping("/api/v1/auths")
public class AuthController {
    private final JwtService jwtService;
    private final AuthCookieProperties properties;

    private final AuthenticationManager authenticationManager;

    @PostMapping("/login")
    public ResponseEntity<UserResponse> login(@RequestBody @Valid LoginRequest request) {

        UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken = new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword());
        log.info("usernamePasswordAuthenticationToken={}", request);
        Authentication authentication = authenticationManager.authenticate(usernamePasswordAuthenticationToken);

        CustomUserDetails userDetails = (CustomUserDetails) authentication.getPrincipal();

        log.info("User details {}", userDetails.getUsername()
        );
        userDetails.getAuthorities().stream().forEach(System.out::println);

        // Generate Token
        String accessToken = jwtService.generateAccessToken(userDetails);

        // User

        log.info("Is Authentication {}", authentication.isAuthenticated());

        UserResponse userResponse = UserResponse.builder()
                .email(userDetails.getUsername())
                .fullName(userDetails.getFullName())
                .roles(userDetails.getAuthorities().stream().map(
                                (grantedAuthority -> grantedAuthority.getAuthority()))
                        .collect(Collectors.toSet()))
                .build();

        ResponseCookie responseCookie = ResponseCookie.from(Constants.ACCESS_TOKEN, accessToken)
                .httpOnly(true)
                .maxAge(Duration.ofDays(1))
                .sameSite(properties.sameSite())
                .secure(properties.secure())
                .path("/")
                .build();
//        AuthResponse authResponse = new AuthResponse(accessToken, UUID.randomUUID().toString(), "", 12345633l, userResponse)

        return ResponseEntity
                .ok()
                .header(HttpHeaders.SET_COOKIE, responseCookie.toString())
                .body(userResponse);
    }

}
