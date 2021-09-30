package yabomu.trip.shared;

import static org.junit.jupiter.api.Assertions.*;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
class TestYbmIdGenerator {

	@Autowired
	YbmIdGenerator idGenerator;

	/**
	 * <pre>
	 * <s>
	 * スレッドの生成数によって、テストが失敗することがある
	 * CPUのコア数とかの問題？
	 * thnumが4までなら安定しているが、5になると赤になることがある。
	 * おそらく自CPUが2コア4論理プロセッサのためか。。。
	 * ただし生成されるIDの重複は発生していない様子
	 * </s>
	 * 生成したスレッドをプールしてjoinしていたが、
	 * スレッドの処理実行後にjoinするようにしたらうまくいった
	 * スレッドの生成処理と実行処理、待機処理の順序が整理できていなかった
	 * </pre>
	 */
	@Test
	void test() {

		int thnum = 25;
		int loopnum = 5000;

		Thread[] ts = new Thread[thnum];
		Map<Long, Long> idMap = new HashMap<>();
		try {
			for(int i = 0; i < thnum; i++) {
				ts[i] = new Thread(new MultiThreadTest(idMap, loopnum));
				ts[i].start();
				ts[i].join();
			}
		} catch (InterruptedException e) {
			e.printStackTrace();
		}
		assertEquals(idMap.size(), thnum*loopnum);
	}
}

class MultiThreadTest implements Runnable {

	Map<Long, Long> idMap = null;
	int loopCnt = 0;

	public MultiThreadTest(Map<Long, Long> idMap, int loopCnt) {
		this.idMap = idMap;
		this.loopCnt = loopCnt;
	}

	public void run() {
		for(int i = 0; i < loopCnt; i++) {
//			try {
//				Thread.sleep(10);
//			} catch (InterruptedException e) {
//				e.printStackTrace();
//			}
			long l = YbmIdGenerator.generate();
			long thid = Thread.currentThread().getId();
			if(idMap.containsKey(l)) {
				System.out.println(LocalDateTime.now() + " already contains...:" + l);
			}else{
				idMap.put(l, thid);
			}

		}
	}
}
