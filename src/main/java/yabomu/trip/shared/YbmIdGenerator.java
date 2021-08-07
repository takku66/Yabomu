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
		// 1ミリ秒あたりの同時処理が1万程度であれば重複しない想定
		multiplicity = 1000000000;
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

		// TODO: 最初の2桁はタイムゾーンのコードとかにしたいが、環境に依存しすぎてしまう。
		// Application起動時に外部から依存性注入させつつstaticなメソッドとして活用できるようにしたい
		return String.format("%04d", 1) +
				String.format("%02d", generateCd.getCd()) +
				newDateTime.format(dtf) +
				String.format("%09d", rn);
	}


}
