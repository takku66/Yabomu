package yabomu.trip.shared;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
class TestYbmIdGenerator {

	@Test
	void test() {
		System.out.println(YbmIdGenerator.generate(YbmIdGenerator.GENCD.EVENT_ID));
		System.out.println(YbmIdGenerator.generate(YbmIdGenerator.GENCD.EVENT_ID));
		System.out.println(YbmIdGenerator.generate(YbmIdGenerator.GENCD.EVENT_ID));
		System.out.println(YbmIdGenerator.generate(YbmIdGenerator.GENCD.EVENT_ID));
		System.out.println(YbmIdGenerator.generate(YbmIdGenerator.GENCD.EVENT_ID));
		System.out.println(YbmIdGenerator.generate(YbmIdGenerator.GENCD.EVENT_ID));
	}

}
