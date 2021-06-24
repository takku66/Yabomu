package yabomu.trip.presentation.aspect;

import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.springframework.stereotype.Component;

@Component
@Aspect
public class YbmAspect {

	@Before("execution(* *..*Controller.*(..))")
	public void nav() {
		System.out.println("hello world");
	}
}
