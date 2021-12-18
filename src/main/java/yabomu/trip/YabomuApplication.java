package yabomu.trip;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import ybmdialect.YbmDialect;

@SpringBootApplication
public class YabomuApplication {

	@Bean
	YbmDialect ybmDialect() {
		return new YbmDialect();
	}
	public static void main(String[] args) {
		SpringApplication.run(YabomuApplication.class, args);
	}

}
