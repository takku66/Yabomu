package yabomu.trip.domain.valueobject;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
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
		// コードからコメント行を作成
		// 置換前：(.*?\(")(.*?)(".*)
		// 置換後：/** $2 */\r\n$1$2$3
		// 空白をTに変更しつつ、orでコメントを増やす
		// 置換前：/\*\*.*? (.*?) (.*) \*/
		// 置換後：/** $1 $2 or $1T$2 */

		/** uuuuMMdd */
		NONMARK_DATE("uuuuMMdd"),
		/** uuuu-MM-dd */
		HYPHEN_DATE("uuuu-MM-dd"),
		/** uuuu/MM/dd */
		SLASH_DATE("uuuu/MM/dd"),
		/** uuuu年MM月dd日 */
		JP_DATE("uuuu年MM月dd日"),
		/** HH:mm */
		TIME_HHMM("HH:mm"),
		TIME_HHMMSS("HH:mm:ss"),
		/** uuuuMMdd HH:mm or uuuuMMddTHH:mm */
		NONMARK_DATE_HOUR_MINUTES("uuuuMMdd HH:mm"),
		/** uuuu-MM-dd HH:mm or uuuu-MM-ddTHH:mm */
		HYPHEN_DATE_HOUR_MINUTES("uuuu-MM-dd HH:mm"),
		/** uuuu/MM/dd HH:mm or uuuu/MM/ddTHH:mm */
		SLASH_DATE_HOUR_MINUTES("uuuu/MM/dd HH:mm"),
		/** uuuu年MM月dd日 HH:mm or uuuu年MM月dd日THH:mm */
		JP_DATE_HOUR_MINUTES("uuuu年MM月dd日 HH:mm"),
		/** uuuuMMdd HH:mm:ss or uuuuMMddTHH:mm:ss */
		NONMARK_DATE_TIME("uuuuMMdd HH:mm:ss"),
		/** uuuu-MM-dd HH:mm:ss or uuuu-MM-ddTHH:mm:ss */
		HYPHEN_DATE_TIME("uuuu-MM-dd HH:mm:ss"),
		/** uuuu/MM/dd HH:mm:ss or uuuu/MM/ddTHH:mm:ss */
		SLASH_DATE_TIME("uuuu/MM/dd HH:mm:ss"),
		/** uuuu年MM月dd日 HH:mm:ss or uuuu年MM月dd日THH:mm:ss */
		JP_DATE_TIME("uuuu年MM月dd日 HH:mm:ss"),
		/** uuuuMMdd HH:mm:ss.SSS or uuuuMMddTHH:mm:ss.SSS */
		NONMARK_DATE_TIMEML3("uuuuMMdd HH:mm:ss.SSS"),
		/** uuuu-MM-dd HH:mm:ss.SSS or uuuu-MM-ddTHH:mm:ss.SSS */
		HYPHEN_DATE_TIMEML3("uuuu-MM-dd HH:mm:ss.SSS"),
		/** uuuu/MM/dd HH:mm:ss.SSS or uuuu/MM/ddTHH:mm:ss.SSS */
		SLASH_DATE_TIMEML3("uuuu/MM/dd HH:mm:ss.SSS"),
		/** uuuu年MM月dd日 HH:mm:ss.SSS or uuuu年MM月dd日THH:mm:ss.SSS */
		JP_DATE_TIMEML3("uuuu年MM月dd日 HH:mm:ss.SSS"),
		/** uuuuMMdd HH:mm:ss.SSSSSS or uuuuMMddTHH:mm:ss.SSSSSS */
		NONMARK_DATE_TIMEML6("uuuuMMdd HH:mm:ss.SSSSSS"),
		/** uuuu-MM-dd HH:mm:ss.SSSSSS or uuuu-MM-ddTHH:mm:ss.SSSSSS */
		HYPHEN_DATE_TIMEML6("uuuu-MM-dd HH:mm:ss.SSSSSS"),
		/** uuuu/MM/dd HH:mm:ss.SSSSSS or uuuu/MM/ddTHH:mm:ss.SSSSSS */
		SLASH_DATE_TIMEML6("uuuu/MM/dd HH:mm:ss.SSSSSS"),
		/** uuuu年MM月dd日 HH:mm:ss.SSSSSS or uuuu年MM月dd日THH:mm:ss.SSSSSS */
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
		if(datetime.indexOf("T") > 0) {
			datetime = datetime.replace("T", " ");
		}
		try {
			if(datetime.indexOf(" ") == -1) {
				this.datetime = LocalDate.parse(datetime, dtf).atTime(LocalTime.MIN);
			}else {
				this.datetime = LocalDateTime.parse(datetime, dtf);
			}
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
