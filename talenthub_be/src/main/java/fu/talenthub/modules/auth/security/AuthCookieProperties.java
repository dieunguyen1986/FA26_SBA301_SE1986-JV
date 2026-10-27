package fu.talenthub.modules.auth.security;

import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties(prefix = "app.auth-cookie")
public record AuthCookieProperties(
        boolean secure,
        String sameSite,
        String accessName,
        String refreshName
) {
}
