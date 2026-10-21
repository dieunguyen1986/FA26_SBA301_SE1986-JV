package fu.talenthub.modules.auth.controller;

import fu.talenthub.modules.auth.dto.AuthResponse;
import fu.talenthub.modules.auth.dto.LoginRequest;
import fu.talenthub.modules.auth.dto.UserResponse;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;
import java.util.UUID;

@RestController
@RequiredArgsConstructor
@Slf4j
@RequestMapping("/api/v1/auths")
public class AuthController {

    private  final AuthenticationManager authenticationManager;

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody @Valid LoginRequest request) {
        UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken = new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword());
        Authentication authentication = authenticationManager.authenticate(usernamePasswordAuthenticationToken);

        // Generate Token


        // User

        log.info("Is Authentication {}", authentication.isAuthenticated());

        UserResponse userResponse = UserResponse.builder().email(request.getEmail()).build();

        return  ResponseEntity.ok(new AuthResponse(UUID.randomUUID().toString(), UUID.randomUUID().toString(), "", 12345633l, userResponse));

    }

}
