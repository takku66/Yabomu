package yabomu.album.domain.valueobject;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;

/**
 * <pre>
 * 年月日
 * </pre>
 * @version 1.0
 */
public class YbmDate {

	private LocalDate date ;

	static public enum FmtPtn {
		NONMARK_DATE("uuuuMMdd"),
		HYPHEN_DATE("uuuu-MM-dd"),
		SLASH_DATE("uuuu/MM/dd"),
		JP_DATE("uuuu年MM月dd日"),
		;
		String ptn;
		FmtPtn(String ptn){
			this.ptn = ptn;
		}
		public String getPtn() {
			return this.ptn;
		}
	}

	/**<pre>
	 * 日付を設定する
	 * </pre>
	 */
	public YbmDate(String date, FmtPtn pattern) {
		// スペース文字含む空文字はnullにする
		if(date == null || date.isBlank()) {
			throw new IllegalArgumentException("指定された日付が空です。");
		}
		// SimpleDateFormatterだとエラーにならない文字も、これだといけるらしい
		DateTimeFormatter dtf = DateTimeFormatter.ofPattern(pattern.getPtn());
		try {
			this.date = LocalDate.parse(date, dtf);
		}catch(DateTimeParseException e) {
			e.printStackTrace();
			throw new IllegalArgumentException("指定された日付のパースに失敗しました。" +
												"[date=" + date.toString() +
												", pattern=" + pattern.getPtn() +
												"]");
		}
	}
	/**<pre>
	 * 日付を設定する
	 * </pre>
	 */
	public YbmDate(LocalDate date) {
		if(date == null) {
			throw new IllegalArgumentException("指定された日付が空です。");
		}
		this.date = date;
	}


	public String valueOf(FmtPtn ptn) {
		return date.format(DateTimeFormatter.ofPattern(ptn.getPtn()));
	}
	public String toNonmarkDate() {
		return date.format(DateTimeFormatter.ofPattern(FmtPtn.NONMARK_DATE.getPtn()));
	}
	public String toHyphenDate() {
		return date.format(DateTimeFormatter.ofPattern(FmtPtn.HYPHEN_DATE.getPtn()));
	}
	public String toSlashDate() {
		return date.format(DateTimeFormatter.ofPattern(FmtPtn.SLASH_DATE.getPtn()));
	}
	public String toJpDate() {
		return date.format(DateTimeFormatter.ofPattern(FmtPtn.JP_DATE.getPtn()));
	}

	public LocalDate value() {
		return this.date;
	}

	public int hashCode() {
		return date.hashCode();
	}

	/**
	 * <pre>
	 * ハイフン付きの日付を返す
	 * 例：2021-01-01
	 * </pre>
	 */
	public String toString() {
		return this.date.toString();
	}

	public boolean equals(Object object) {
		YbmDate date = (YbmDate)object;
		return this.date.equals(date.value());
	}

}
