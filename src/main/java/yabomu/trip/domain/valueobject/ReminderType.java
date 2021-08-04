package yabomu.trip.domain.valueobject;

import java.util.HashMap;
import java.util.Map;

/**
 * <pre>
 * リピート設定定義enum
 * </pre>
 * @version 1.0
 */
public enum ReminderType {


	SINGLE	("0", "今回のみ"),
	REPEAT	("1", "リピート"),
	;

	String code;
	String description;
	static private Map<String, ReminderType> map = new HashMap<>();

	static {
		for(ReminderType e : ReminderType.values()) {
			map.put(e.getCode(), e);
		}
	}

	ReminderType(String code, String description){
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
	static public ReminderType selectBy(String code){
		return map.containsKey(code)
				? map.get(code)
				: getDefault();
	}
	static public ReminderType getDefault(){
		return ReminderType.SINGLE;
	}

}
