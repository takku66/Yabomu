package yabomu.trip.domain.valueobject;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;

import org.springframework.util.ObjectUtils;

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
	/**
	 * <pre>
	 * 日付を設定する
	 * e.g:
	 * new YbmDate("20210101", YbmDate.FmtPtn.NONMARK_DATE) -> OK
	 * new YbmDate("2021/01/01", YbmDate.FmtPtn.SLASH_DATE) -> OK
	 * new YbmDate("20210101", YbmDate.FmtPtn.SLASH_DATE) -> NG
	 * </pre>
	 * @param date 設定する日付文字列
	 * @param pattern 設定する日付のフォーマット
	 */
	public YbmDate(String date, FmtPtn pattern) {
		// スペース文字含む空文字はnullにする
		if(date == null || date.isBlank()) {
			this.date = null;
			return;
		}
		// SimpleDateFormatterだとエラーにならない文字も、これだといけるらしい
		DateTimeFormatter dtf = DateTimeFormatter.ofPattern(pattern.getPtn());
		try {
			this.date = LocalDate.parse(date, dtf);
		}catch(DateTimeParseException e) {
			e.printStackTrace();
			throw e;
		}
	}
	/**<pre>
	 * 日付を設定する
	 * </pre>
	 */
	public YbmDate(LocalDate date) {
		this.date = date;
	}


	public String valueOf(FmtPtn ptn) {
		return date != null ? date.format(DateTimeFormatter.ofPattern(ptn.getPtn()))
							: "";
	}
	public String toNonmarkDate() {
		return date != null ? date.format(DateTimeFormatter.ofPattern(FmtPtn.NONMARK_DATE.getPtn()))
							: "";
	}
	public String toHyphenDate() {
		return date != null ? date.format(DateTimeFormatter.ofPattern(FmtPtn.HYPHEN_DATE.getPtn()))
							: "";
	}
	public String toSlashDate() {
		return date != null ? date.format(DateTimeFormatter.ofPattern(FmtPtn.SLASH_DATE.getPtn()))
							: "";
	}
	public String toJpDate() {
		return date != null ? date.format(DateTimeFormatter.ofPattern(FmtPtn.JP_DATE.getPtn()))
							: "";
	}

	public LocalDate value() {
		return this.date;
	}

	public int hashCode() {
		return date != null ? date.hashCode() : 0;
	}

	/**
	 * <pre>
	 * ハイフン付きの日付を返す
	 * 例：2021-01-01
	 * </pre>
	 */
	public String toString() {
		return this.date != null ? this.date.toString() : "";
	}

	public boolean equals(Object object) {
		YbmDate date = (YbmDate)object;
		if(this.date == null) {
			if(object == null || ObjectUtils.isEmpty(object)) {
				return true;
			}else {
				return false;
			}
		}else {
			return this.date.equals(date.value());
		}
	}

}
