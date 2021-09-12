package yabomu.trip.shared;

import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.time.ZoneOffset;
import java.time.ZonedDateTime;
import java.util.concurrent.atomic.AtomicInteger;

public class YbmIdGenerator {
	private long lastms = 0;
	private AtomicInteger seq = new AtomicInteger(0);
	private int offset = +9;
	private long appCd = 1;
	private static YbmIdGenerator generator;
	private YbmIdGenerator() {
	}
	public static final YbmIdGenerator setup(int offset, int appCd) {
		if(generator != null) {
			throw new IllegalStateException("既に初期化処理が行われています。本メソッドは１つのアプリケーションで１回だけ呼び出してください。");
		}
		generator = new YbmIdGenerator();
		generator.lastms = 0;
		generator.seq = new AtomicInteger(0);
		generator.offset = offset;
		generator.appCd = appCd;
		return generator;
	}
	synchronized public static long generate() {
		return generator.createId();
	}

	synchronized public final long createId() {
		if(generator == null) {
			throw new IllegalStateException("初期化設定がされていません。setupメソッドを呼び出して設定してください。");
		}
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
		return ms + (appCd * 10000) + seq.intValue();
	}
}
