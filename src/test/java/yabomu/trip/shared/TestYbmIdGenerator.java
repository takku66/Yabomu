package yabomu.trip.shared;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
class TestYbmIdGenerator {

	@Test
	void test() {
		YbmIdGenerator.setup(+9, 0);
		Thread[] ts = new Thread[10];
		for(int i = 0; i < 10; i++) {
			ts[i] = new Thread(new MultiThreadTest());
			ts[i].start();
		}
		try {
			for(int i = 0; i < 10; i++) {
					ts[i].join();
			}
		} catch (InterruptedException e) {
			e.printStackTrace();
		}
	}
}

class MultiThreadTest implements Runnable {
	public void run() {
		for(int i = 0; i < 1000; i++) {
			System.out.println(YbmIdGenerator.generate());
		}
	}
}
