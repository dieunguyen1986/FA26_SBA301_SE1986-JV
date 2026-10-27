package fu.talenthub.modules.auth.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import java.nio.charset.StandardCharsets;
import java.time.Instant;
import java.util.Date;
import java.util.List;
import java.util.UUID;

@Component
@Slf4j
@RequiredArgsConstructor
public class JwtService {
    private final JwtProperties properties;

    @Value("${app.jwt.secret-base64}")
    private String secretKey;

    public String generateAccessToken(UserDetails userDetails) {

        List<String> roles = userDetails.getAuthorities().stream().map((GrantedAuthority::getAuthority
        )).toList();

        return Jwts.builder()
                .id(UUID.randomUUID().toString())
                .claim("roles", roles)
                .subject(userDetails.getUsername())
                .issuedAt(Date.from(Instant.now()))
                .expiration(Date.from(Instant.now().plusSeconds(properties.accessTokenTtlSeconds()))) //
                .signWith(Keys.hmacShaKeyFor(properties.secretBase64().getBytes(StandardCharsets.UTF_8)))
                .compact();
    }

    public String extractUsername(String accessToken) {
        return extractAllClaims(accessToken).getSubject();
    }

//    public Claims extractAllClaims(String token) {
//        return Jwts.parser()
//                .verifyWith(Keys.hmacShaKeyFor(properties.secretBase64().getBytes(StandardCharsets.UTF_8))) // Dùng khóa của server để kiểm tra chữ ký HMAC.
//                .build()
//                .parseSignedClaims(token) // Đọc JWT có chữ ký; sai chữ ký, hết hạn hoặc sai định dạng sẽ ném exception.
//                .getPayload(); // Chỉ trả claims sau khi parser đã chấp nhận token.
//    }

    public boolean verifyToken(String token, UserDetails userDetails) {
        return (extractUsername(token).equals(userDetails.getUsername()) && ! extractAllClaims(token).getExpiration().before(new Date()));
    }


//    private boolean isTokenExpired(String token) {
//        return extractExpiration(token).before(new Date());
//    }
//
//    private Date extractExpiration(String token) {
//        return extractAllClaims(token).getExpiration();
//    }

    private Claims extractAllClaims(String token) {
        return Jwts.parser()
                .verifyWith(Keys.hmacShaKeyFor(properties.secretBase64().getBytes(StandardCharsets.UTF_8)))
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }
}
