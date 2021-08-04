package yabomu.trip.domain.valueobject;

import java.util.HashMap;
import java.util.Map;

/**
 * <pre>
 * リピート設定定義enum
 * </pre>
 * @version 1.0
 */
public enum ReminderRepeat {


	NONE				("", "設定なし"),
	REPEAT_EVERY_DAY	("D001", "1日おき"),
	REPEAT_EVERY_WEEK	("D007", "1週間おき"),
	REPEAT_EVERY_MONTH	("D030", "1ヶ月おき"),
	REPEAT_EVERY_YEAR	("D365", "1年おき"),
	;

	String code;
	String description;
	static private Map<String, ReminderRepeat> map = new HashMap<>();

	static {
		for(ReminderRepeat e : ReminderRepeat.values()) {
			map.put(e.getCode(), e);
		}
	}

	ReminderRepeat(String code, String description){
		this.code = code;
		this.description = description;
	}


	public String getCode() {
		return this.code;
	}
	public String getDescription() {
		return description;
	}

	// TODO:共通化したい
	static public ReminderRepeat selectBy(String code){
		return map.containsKey(code)
				? map.get(code)
				: getDefault();
	}
	static public ReminderRepeat getDefault(){
		return ReminderRepeat.NONE;
	}

}
