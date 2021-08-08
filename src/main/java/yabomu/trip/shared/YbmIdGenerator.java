package yabomu.trip.shared;

import java.time.LocalDateTime;
import java.time.ZoneOffset;
import java.time.ZonedDateTime;
import java.util.concurrent.atomic.AtomicInteger;

public class YbmIdGenerator {
	private LocalDateTime lastDateTime;
	private AtomicInteger seq;
	private int offset;
	private long appCd;
	private static YbmIdGenerator generator;
	private YbmIdGenerator() {
	}
	public static YbmIdGenerator setUpInstance(int offset, int appCd) {
		if(generator != null) {
			throw new IllegalStateException("既にインスタンスが生成されています。");
		}
		generator = new YbmIdGenerator();
		generator.lastDateTime = LocalDateTime.now();
		generator.seq = new AtomicInteger(0);
		generator.offset = offset;
		generator.appCd = appCd;
		return generator;
	}
	synchronized public static final long generate() {
		return generator.createId();
	}
	synchronized private final long createId() {
		if(generator == null) {
			throw new IllegalStateException(this.getClass().getName() + "は初期化されていません。");
		}
		LocalDateTime newDateTime = LocalDateTime.now();
		//ZonedDateTime zdt = ldt.atZone(ZoneOffset.UTC); UTCの場合
	    ZonedDateTime zdt = newDateTime.atZone(ZoneOffset.ofHours(offset));
	    long ms = zdt.toInstant().toEpochMilli() * 1000000;
		if(lastDateTime.compareTo(newDateTime) > 0) {
			throw new IllegalStateException("IDの生成に失敗しました。システム時刻がずれた可能性があります。"
										+ "[lastDateTime=" + lastDateTime + ","
										+ "newDateTime=" + newDateTime + "]");
		}
		if(lastDateTime.compareTo(newDateTime) == 0) {
			seq.incrementAndGet();
		}else {
			seq.set(0);
		}
		lastDateTime = newDateTime;
		return ms + seq.intValue();
	}
}
