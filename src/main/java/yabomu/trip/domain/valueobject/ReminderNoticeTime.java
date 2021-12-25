package yabomu.trip.domain.valueobject;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonSerializable;
import com.fasterxml.jackson.databind.SerializerProvider;
import com.fasterxml.jackson.databind.jsontype.TypeSerializer;

/**
 * <pre>
 * リマインダー通知時間定義enum
 * </pre>
 * @version 1.0
 */
public enum ReminderNoticeTime implements JsonSerializable {

	NONE			(-1, "通知時刻を設定する"),
	ON_TIME			(0, "指定した時刻に通知"),
	BEFORE_5M		(5, "５分前に通知"),
	BEFORE_15M		(15, "1５分前に通知"),
	BEFORE_30M		(30, "30分前に通知"),
	BEFORE_60M		(60, "1時間前に通知"),
	BEFORE_HALF_DAY	(720, "６時間前に通知"),
	BEFORE_1DAY		(1440, "1日前に通知"),
	BEFORE_7DAY		(10080, "7日前に通知"),
	;

	Integer code;
	String description;
	static private Map<Integer, ReminderNoticeTime> map = new HashMap<>();

	// 本クラスはインスタンス化しないため、クラスロード時にメンバ変数への代入処理を実行させる
	static {
		for(ReminderNoticeTime e : ReminderNoticeTime.values()) {
			map.put(e.getCode(), e);
		}
	}

	ReminderNoticeTime(Integer code, String description) {
		this.code = code;
		this.description = description;
	}

	public Integer getCode() {
		return code;
	}
	public String getDescription() {
		return description;
	}

	@JsonCreator(mode = JsonCreator.Mode.DELEGATING)
	static public ReminderNoticeTime selectBy(Integer code){
		return map.containsKey(code)
				? map.get(code)
				: getDefault();
	}
	static public ReminderNoticeTime getDefault(){
		return ReminderNoticeTime.NONE;
	}


	/**
	 * EnumがJsonへ変換される時に、Enumの文字列ではなく、コード値をシリアライズするため
	 */
    @Override
    public void serialize(JsonGenerator jgen, SerializerProvider provider) throws IOException, JsonProcessingException {
        jgen.writeNumber(this.getCode());
    }

    @Override
    public void serializeWithType(JsonGenerator jgen, SerializerProvider provider, TypeSerializer typeSer)  throws IOException, JsonProcessingException  {
    	jgen.writeNumber(this.getCode());
    }
}
