package yabomu.trip.domain.valueobject;

import java.time.LocalDateTime;
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

	private LocalDateTime datetime ;

	static public enum FmtPtn {
		NONMARK_DATE("uuuuMMdd"),
		HYPHEN_DATE("uuuu-MM-dd"),
		SLASH_DATE("uuuu/MM/dd"),
		JP_DATE("uuuu年MM月dd日"),
		NONMARK_DATE_TIME("uuuuMMdd HH:mm:ss"),
		HYPHEN_DATE_TIME("uuuu-MM-dd HH:mm:ss"),
		SLASH_DATE_TIME("uuuu/MM/dd HH:mm:ss"),
		JP_DATE_TIME("uuuu年MM月dd日 HH:mm:ss"),
		NONMARK_DATE_TIMEML3("uuuuMMdd HH:mm:ss.SSS"),
		HYPHEN_DATE_TIMEML3("uuuu-MM-dd HH:mm:ss.SSS"),
		SLASH_DATE_TIMEML3("uuuu/MM/dd HH:mm:ss.SSS"),
		JP_DATE_TIMEML3("uuuu年MM月dd日 HH:mm:ss.SSS"),
		NONMARK_DATE_TIMEML6("uuuuMMdd HH:mm:ss.SSSSSS"),
		HYPHEN_DATE_TIMEML6("uuuu-MM-dd HH:mm:ss.SSSSSS"),
		SLASH_DATE_TIMEML6("uuuu/MM/dd HH:mm:ss.SSSSSS"),
		JP_DATE_TIMEML6("uuuu年MM月dd日 HH:mm:ss.SSSSSS"),
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
	public YbmDate(String datetime, FmtPtn pattern) {
		// スペース文字含む空文字はnullにする
		if(datetime == null || datetime.isBlank()) {
			this.datetime = null;
			return;
		}
		// SimpleDateFormatterだとエラーにならない文字も、これだといけるらしい
		DateTimeFormatter dtf = DateTimeFormatter.ofPattern(pattern.getPtn());
		try {
			this.datetime = LocalDateTime.parse(datetime, dtf);
		}catch(DateTimeParseException e) {
			e.printStackTrace();
			throw e;
		}
	}
	/**<pre>
	 * 日付を設定する
	 * </pre>
	 */
	public YbmDate(LocalDateTime datetime) {
		this.datetime = datetime;
	}


	public String valueOf(FmtPtn ptn) {
		return datetime != null
				? datetime.format(DateTimeFormatter.ofPattern(ptn.getPtn()))
				: "";
	}
	public String toNonmarkDate() {
		return datetime != null
				? datetime.format(DateTimeFormatter.ofPattern(FmtPtn.NONMARK_DATE.getPtn()))
				: "";
	}
	public String toHyphenDate() {
		return datetime != null
				? datetime.format(DateTimeFormatter.ofPattern(FmtPtn.HYPHEN_DATE.getPtn()))
				: "";
	}
	public String toSlashDate() {
		return datetime != null
				? datetime.format(DateTimeFormatter.ofPattern(FmtPtn.SLASH_DATE.getPtn()))
				: "";
	}
	public String toJpDate() {
		return datetime != null
				? datetime.format(DateTimeFormatter.ofPattern(FmtPtn.JP_DATE.getPtn()))
				: "";
	}

	public String toNonmarkDateTime() {
		return datetime != null
				? datetime.format(DateTimeFormatter.ofPattern(FmtPtn.NONMARK_DATE_TIME.getPtn()))
				: "";
	}
	public String toHyphenDateTime() {
		return datetime != null
				? datetime.format(DateTimeFormatter.ofPattern(FmtPtn.HYPHEN_DATE_TIME.getPtn()))
				: "";
	}
	public String toSlashDateTime() {
		return datetime != null
				? datetime.format(DateTimeFormatter.ofPattern(FmtPtn.SLASH_DATE_TIME.getPtn()))
				: "";
	}
	public String toJpDateTime() {
		return datetime != null
				? datetime.format(DateTimeFormatter.ofPattern(FmtPtn.JP_DATE_TIME.getPtn()))
				: "";
	}

	public String toNonmarkDateTimeMl3() {
		return datetime != null
				? datetime.format(DateTimeFormatter.ofPattern(FmtPtn.NONMARK_DATE_TIMEML3.getPtn()))
				: "";
	}
	public String toHyphenDateTimeMl3() {
		return datetime != null
				? datetime.format(DateTimeFormatter.ofPattern(FmtPtn.HYPHEN_DATE_TIMEML3.getPtn()))
				: "";
	}
	public String toSlashDateTimeMl3() {
		return datetime != null
				? datetime.format(DateTimeFormatter.ofPattern(FmtPtn.SLASH_DATE_TIMEML3.getPtn()))
				: "";
	}
	public String toJpDateTimeMl3() {
		return datetime != null
				? datetime.format(DateTimeFormatter.ofPattern(FmtPtn.JP_DATE_TIMEML3.getPtn()))
				: "";
	}

	public String toNonmarkDateTimeMl6() {
		return datetime != null
				? datetime.format(DateTimeFormatter.ofPattern(FmtPtn.NONMARK_DATE_TIMEML6.getPtn()))
				: "";
	}
	public String toHyphenDateTimeMl6() {
		return datetime != null
				? datetime.format(DateTimeFormatter.ofPattern(FmtPtn.HYPHEN_DATE_TIMEML6.getPtn()))
				: "";
	}
	public String toSlashDateTimeMl6() {
		return datetime != null
				? datetime.format(DateTimeFormatter.ofPattern(FmtPtn.SLASH_DATE_TIMEML6.getPtn()))
				: "";
	}
	public String toJpDateTimeMl6() {
		return datetime != null
				? datetime.format(DateTimeFormatter.ofPattern(FmtPtn.JP_DATE_TIMEML6.getPtn()))
				: "";
	}

	public LocalDateTime value() {
		// LocalDateTime自体が不変であるため、複製の必要なし
		return this.datetime;
	}

	public int hashCode() {
		return datetime != null ? datetime.hashCode() : 0;
	}

	/**
	 * <pre>
	 * ハイフン付きの日付を返す
	 * 例：2021-01-01
	 * </pre>
	 */
	public String toString() {
		return this.datetime != null ? this.datetime.toString() : "";
	}

	public boolean equals(Object object) {
		YbmDate datetime = (YbmDate)object;
		if(this.datetime == null) {
			if(object == null || ObjectUtils.isEmpty(object)) {
				return true;
			}else {
				return false;
			}
		}else {
			return this.datetime.equals(datetime.value());
		}
	}

}
