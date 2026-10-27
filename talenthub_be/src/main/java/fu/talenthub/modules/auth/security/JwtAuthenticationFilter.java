package fu.talenthub.modules.auth.security;

import fu.talenthub.common.Constants;
import io.jsonwebtoken.JwtException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
@Slf4j
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {
    private final JwtService jwtService;
    private final UserDetailsService userDetailsService;


    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {

        Cookie[] cookies = request.getCookies();
        String accessToken = null;

        if (cookies != null) {
            for (Cookie cookie : cookies) {
                if (Constants.ACCESS_TOKEN.equals(cookie.getName())) {
                    accessToken = cookie.getValue();
                    break;
                }
            }
        }

        // 2. Extract thông tin & 3. Xác thực và lưu vào trong SecurityContext
        if (accessToken != null && !accessToken.trim().isEmpty()) { // Không parse đầu vào null, rỗng hoặc toàn khoảng trắng.
            try {

                log.info("Access token = {}", accessToken);

                String username = jwtService.extractUsername(accessToken);
                log.info("User name {}", username);

                // Chỉ tra cứu tài khoản khi subject có nội dung.
                if (username != null && !username.isBlank()) {
                    UserDetails userDetails = this.userDetailsService.loadUserByUsername(username);

                    if (jwtService.verifyToken(accessToken, userDetails)) {

                        UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
                                userDetails,
                                null,
                                userDetails.getAuthorities() // Quyền dùng cho các bước phân quyền tiếp theo.
                        );
                        authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

                        // Store to Security Context
                        SecurityContextHolder.getContext().setAuthentication(authToken);
                        log.debug("Successfully authenticated user: {} and set into SecurityContext", username);
                    } else {
                        // Verify false: không tạo Authentication, request vẫn chưa được xác thực.
                        log.warn("Invalid JWT token for user: {}", username);
                    }
                }
            } catch (JwtException | IllegalArgumentException | AuthenticationException e) {
                response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                log.debug("JWT authentication rejected");
            }

        }

        filterChain.doFilter(request, response);
    }
}
