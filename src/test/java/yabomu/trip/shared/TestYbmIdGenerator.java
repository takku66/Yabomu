package yabomu.trip.shared;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
class TestYbmIdGenerator {

	@Test
	void test() {
//		long s = System.currentTimeMillis();
//		for(int i = 0; i < 1000000; i++) {
//			System.out.println(YbmIdGenerator.generate(YbmIdGenerator.GENCD.EVENT_ID));
//		}
//		long e = System.currentTimeMillis();
//
//
//		long s2 = System.currentTimeMillis();
//		for(int i = 0; i < 1000000; i++) {
//			System.out.println(YbmIdGenerator.generate());
//		}
//		long e2 = System.currentTimeMillis();
//
//		System.out.println("dtfでformat+ランダム値生成：秒数：" + (e-s));
//		System.out.println("64bitで生成＋色々計算：秒数：" + (e2-s2));
		Thread[] ts = new Thread[5];
		for(int i = 0; i < 3; i++) {
			ts[i] = new Thread(new MultiThreadTest());
			ts[i].start();
		}
		try {
			for(int i = 0; i < 3; i++) {
					ts[i].join();
			}
		} catch (InterruptedException e) {
			e.printStackTrace();
		}
//		System.out.println("■マルチCスタート");
//		new Thread(new MultiThreadTest("■マルチCエンド")).start();
	}
}

class MultiThreadTest implements Runnable {
	public void run() {
		long s2 = System.currentTimeMillis();
		for(int i = 0; i < 10000; i++) {
			System.out.println(YbmIdGenerator.generate());
		}
		long e2 = System.currentTimeMillis();
		System.out.println("64bitで生成＋色々計算：秒数：" + (e2-s2));
		System.out.println("end");
	}
}
