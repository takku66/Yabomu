package yabomu.trip.shared;

import static org.junit.jupiter.api.Assertions.*;

import java.util.HashSet;
import java.util.Set;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
class TestYbmIdGenerator {

	@Autowired
	YbmIdGenerator idGenerator;

	@Test
	void test() {

		Thread[] ts = new Thread[10];
		Set<Long> idSet = new HashSet<>();
		for(int i = 0; i < 10; i++) {
			ts[i] = new Thread(new MultiThreadTest(idSet, 1000));
			ts[i].start();
		}
		try {
			for(int i = 0; i < 10; i++) {
					ts[i].join();
			}
		} catch (InterruptedException e) {
			e.printStackTrace();
		}
		assertEquals(idSet.size(), 10*1000);
	}
}

class MultiThreadTest implements Runnable {

	Set<Long> idSet = null;
	int loopCnt = 0;

	public MultiThreadTest(Set<Long> idSet, int loopCnt) {
		this.idSet = idSet;
		this.loopCnt = loopCnt;
	}

	public void run() {
		for(int i = 0; i < loopCnt; i++) {
			idSet.add(YbmIdGenerator.generate());
		}
	}
}
