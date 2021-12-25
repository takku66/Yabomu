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
 * リピート設定定義enum
 * </pre>
 * @version 1.0
 */
public enum ReminderRepeat implements JsonSerializable {


	NONE					("", "リピート設定をする"),
	REPEAT_EVERY_DAY		("D001", "1日おき"),
	REPEAT_EVERY_WEEK		("D007", "1週間おき"),
	REPEAT_EVERY_MONTH		("D030", "1ヶ月おき"),
	REPEAT_EVERY_HALF_YEAR	("D180", "半年おき"),
	REPEAT_EVERY_YEAR		("D365", "1年おき"),
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

	// githubにて解決済みのissueぽい
	// https://github.com/FasterXML/jackson-module-kotlin/issues/336
	@JsonCreator(mode = JsonCreator.Mode.DELEGATING)
	static public ReminderRepeat selectBy(String code){
		return map.containsKey(code)
				? map.get(code)
				: getDefault();
	}
	static public ReminderRepeat getDefault(){
		return ReminderRepeat.NONE;
	}

	/**
	 * EnumがJsonへ変換される時に、Enumの文字列ではなく、コード値をシリアライズするため
	 */
    @Override
    public void serialize(JsonGenerator jgen, SerializerProvider provider) throws IOException, JsonProcessingException {
        jgen.writeString(this.getCode());
    }

    @Override
    public void serializeWithType(JsonGenerator jgen, SerializerProvider provider, TypeSerializer typeSer)  throws IOException, JsonProcessingException  {
    	jgen.writeString(this.getCode());
    }

}
