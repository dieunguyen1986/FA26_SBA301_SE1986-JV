package fu.talenthub.modules.auth.security;

import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties(prefix = "app.jwt")
public record JwtProperties(
        String secretBase64,
        String issuer,
        Long accessTokenTtlSeconds,
        Long refreshTokenTtlSeconds
) {


}
