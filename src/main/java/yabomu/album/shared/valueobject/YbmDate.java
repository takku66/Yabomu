package yabomu.album.shared.valueobject;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;

/**
 * <pre>
 * 年月日
 * </pre>
 * @version 1.0
 */
public class YbmDate implements YBM_VO {

	private LocalDate date ;

	public enum FmtPtn {
		HYPHEN_DATE("uuuu-MM-dd"),
		SLASH_DATE("uuuu/MM/dd"),
		NONMARK_DATE("uuuuMMdd"),
		JP_DATE("uuuu年MM月dd日"),
		JPG_DATE("uu年MM月dd日");
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
			date = null;
		}
		// SimpleDateFormatterだとエラーにならない文字も、これだといけるらしい
		DateTimeFormatter dtf = DateTimeFormatter.ofPattern(pattern.getPtn());
		try {
			this.date = LocalDate.parse(date, dtf);
		}catch(DateTimeParseException e) {
			e.printStackTrace();
		}
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

	@Override
	public int hashCode() {
		return date.hashCode();
	}

	@Override
	public String toString() {
		return this.date.toString();
	}

}
