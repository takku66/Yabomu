package yabomu.album.domain.model.todolist;

import java.util.HashMap;
import java.util.Map;

/**
 * <pre>
 * リマインダー設定定義クラス
 * </pre>
 * @author takku66
 * @version 1.0
 */
public class ReminderConfig {

	final static private Map<Integer, ReminderConfig.Time> timeMap = new HashMap<>();
	final static private Map<Integer, ReminderConfig.Repeat> repeatMap = new HashMap<>();

	// 本クラスはインスタンス化しないため、クラスロード時にメンバ変数への代入処理を実行させる
	static {
		createTimeMap(ReminderConfig.Time.values());
		createRepeatMap(ReminderConfig.Repeat.values());
	}

	/**
	 * <pre>
	 * 本クラスはインスタンス化を許可しない
	 * </pre>
	 */
	private ReminderConfig () {
	}

	// TODO:共通化したい
	static private Map<Integer, ReminderConfig.Time> createTimeMap(ReminderConfig.Time[] values) {
		for(ReminderConfig.Time value : values) {
			timeMap.put(value.getCode(), value);
		}
		return timeMap;
	}
	static private Map<Integer, ReminderConfig.Repeat> createRepeatMap(ReminderConfig.Repeat[] values) {
		Map<Integer, ReminderConfig.Repeat> map = new HashMap<Integer, ReminderConfig.Repeat>(values.length);
		for(ReminderConfig.Repeat value : values) {
			repeatMap.put(value.getCode(), value);
		}
		return repeatMap;
	}


	// TODO:曜日毎のオプションもつけたいけど、イメージがつかないので保留...

	public enum Time {
		NONE			(-1, "設定なし"),
		ON_TIME			(0, "指定した時刻に通知"),
		BEFORE_5M		(5, "５分前に通知"),
		BEFORE_15M		(15, "1５分前に通知"),
		BEFORE_30M		(30, "30分前に通知"),
		BEFORE_60M		(60, "1時間前に通知"),
		BEFORE_HALF_DAY	(720, "６時間前に通知"),
		BEFORE_1DAY		(1440, "1日前に通知"),
		BEFORE_7DAY		(10080, "7日前に通知"),
		;

		int code;
		String discription;

		Time(int code, String discription) {
			this.code = code;
			this.discription = discription;
		}

		public int getCode() {
			return code;
		}
		public String getDiscription() {
			return discription;
		}

		// TODO:共通化したい
		// timeMapに何も入ってない！！
		static public ReminderConfig.Time selectBy(int code){
			return timeMap.containsKey(code)
					? timeMap.get(code)
					: getDefault();
		}
		static public ReminderConfig.Time getDefault(){
			return ReminderConfig.Time.NONE;
		}

	}

	public enum Repeat {
		NONE				(-1, "設定なし"),
		REPEAT_EVERY_DAY	(1, "1日おき"),
		REPEAT_EVERY_WEEK	(7, "1週間おき"),
		REPEAT_EVERY_MONTH	(30, "1ヶ月おき"),
		REPEAT_EVERY_YEAR	(365, "1年おき"),
		;

		int code;
		String discription;

		Repeat(int code, String discription){
			this.code = code;
			this.discription = discription;
		}


		public int getCode() {
			return this.code;
		}
		public String getDiscription() {
			return discription;
		}

		// TODO:共通化したい
		static public ReminderConfig.Repeat selectBy(int code){
			return repeatMap.containsKey(code)
					? repeatMap.get(code)
					: getDefault();
		}
		static public ReminderConfig.Repeat getDefault(){
			return ReminderConfig.Repeat.NONE;
		}

	}

}
