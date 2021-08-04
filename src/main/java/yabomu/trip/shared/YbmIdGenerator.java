package yabomu.trip.shared;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

public class YbmIdGenerator {
	private final  static DateTimeFormatter dtf = DateTimeFormatter.ofPattern("yyyyMMddHHmmssSSS");
	private static LocalDateTime lastDateTime;
	private static long multiplicity;
	private YbmIdGenerator() {
	}
	static {
		lastDateTime = LocalDateTime.now();
		// 誕生日のパラドクスより1.25*√Hで重複するまでの回数が求められる
		// 100000000であれば、1万ユーザーの同時生成で重複する可能性がでてくる
		multiplicity = 100000000;
	}

	enum GENCD {
		USER_ID(0),
		EVENT_ID(1),
		TODO_ID(2),
		CHKLIST_ID(3);

		int cd;

		GENCD(int cd){
			this.cd = cd;
		}

		public int getCd() {
			return this.cd;
		}
	}

	public static final String generate(GENCD generateCd) {
		LocalDateTime newDateTime = LocalDateTime.now();
		if(lastDateTime.compareTo(newDateTime) > 0) {
			throw new IllegalStateException("タイムスタンプの生成に失敗しました。システム時刻がずれた可能性があります。"
										+ "[lastDateTime=" + lastDateTime.format(dtf) + ","
										+ "newDateTime=" + newDateTime.format(dtf) + "]");
		}
		long rn = (long)(Math.random()*9 * multiplicity);
		return newDateTime.format(dtf) + String.format("%03d", generateCd.getCd()) + String.format("%09d", rn);
	}


}
