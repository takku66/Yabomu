package yabomu.trip.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.core.annotation.Order;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;


@Configuration
@Order(1)
public class OAuthSecurityConfig extends WebSecurityConfigurerAdapter {

    private final LogoutHandler logoutHandler;

    public OAuthSecurityConfig(LogoutHandler logoutHandler) {
        this.logoutHandler = logoutHandler;
    }

	@Override
	protected void configure(HttpSecurity http) throws Exception {
		http
		.oauth2Login()
		.and().logout()
		.logoutRequestMatcher(new AntPathRequestMatcher("/logout"))
		.addLogoutHandler(logoutHandler);
	}

}