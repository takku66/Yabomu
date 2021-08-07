package yabomu.trip.shared;

import java.time.LocalDateTime;
import java.time.temporal.ChronoField;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
class TestYbmIdGenerator {

	@Test
	void test() {
		System.out.println( YbmIdGenerator.generate(YbmIdGenerator.GENCD.EVENT_ID));
		System.out.println(YbmIdGenerator.generate(YbmIdGenerator.GENCD.EVENT_ID));
		System.out.println(YbmIdGenerator.generate(YbmIdGenerator.GENCD.EVENT_ID));
		System.out.println(YbmIdGenerator.generate(YbmIdGenerator.GENCD.EVENT_ID));
		System.out.println(YbmIdGenerator.generate(YbmIdGenerator.GENCD.EVENT_ID));
		System.out.println(YbmIdGenerator.generate(YbmIdGenerator.GENCD.EVENT_ID));
		System.out.println(LocalDateTime.now().getYear());
		System.out.println(LocalDateTime.now().getDayOfYear());
		System.out.println(LocalDateTime.now().get(ChronoField.MILLI_OF_DAY));
		long yy = (long)(LocalDateTime.now().getYear() - 2000) * (long)100000000 * (long)100000000;
		long ddd = (long)(LocalDateTime.now().getDayOfYear()) * (long)100000 * (long)100000000;
		long fff = (long)(LocalDateTime.now().get(ChronoField.MILLI_OF_DAY)) * (long)100000;
		System.out.println(yy);
		System.out.println(ddd);
		System.out.println(fff);
		System.out.println((long)yy + (long)ddd);
		System.out.println(yy + ddd + fff);
	}

}
