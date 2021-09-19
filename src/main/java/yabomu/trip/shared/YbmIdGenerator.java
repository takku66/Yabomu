package yabomu.trip.shared;

import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.time.ZoneOffset;
import java.time.ZonedDateTime;
import java.util.concurrent.atomic.AtomicInteger;

import org.springframework.stereotype.Component;

//@Singleton
//@ApplicationScope
@Component
public class YbmIdGenerator {
	private static long lastms = 0;
	private static AtomicInteger seq = new AtomicInteger(0);
	private static int offset = +9;
//	private YbmIdGenerator() {
//	}
	public YbmIdGenerator() {
	}
	synchronized public static long generate() {
		return createId();
	}

	synchronized private static long createId() {

		LocalDateTime newDateTime = LocalDateTime.now();
		//ZonedDateTime zdt = ldt.atZone(ZoneOffset.UTC); UTCの場合
	    ZonedDateTime zdt = newDateTime.atZone(ZoneOffset.ofHours(offset));
	    long ms = zdt.toInstant().toEpochMilli() * 1000000;
		if(lastms > ms) {
			throw new IllegalStateException("IDの生成に失敗しました。システム時刻がずれた可能性があります。"
										+ "[lastDateTime=" + new Timestamp(lastms) + ","
										+ "newDateTime=" + new Timestamp(ms) + "]");
		}
		if(lastms == ms) {
			seq.incrementAndGet();
		}else {
			seq.set(0);
		}
		lastms = ms;
		return ms + seq.intValue();
	}
}
