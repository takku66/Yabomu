package yabomu.trip.domain.valueobject;

import yabomu.trip.shared.YbmIdGenerator;

/**
 * <pre>
 * イベントID
 * </pre>
 * @version 1.0
 */
public class EventId {

	private Long eventId;

	/**<pre>
	 * 新しいIDを生成する
	 * </pre>
	 */
	public EventId() {
		this.eventId = YbmIdGenerator.generate();
	}
	/**<pre>
	 * 引数に渡されたIDを設定する
	 * </pre>
	 */
	public EventId(Long id) {
		if(id == null || id.longValue() <= 0) {
			throw new IllegalArgumentException("イベントIDが不正です。[" + id + "]");
		}
		this.eventId = id;
	}
	public EventId(String id) {
		if(id == null || "".equals(id)) {
			throw new IllegalArgumentException("イベントIDが不正です。[" + id + "]");
		}
		this.eventId = Long.valueOf(id);
	}

	public long value() {
		return this.eventId;
	}

	public int hashCode() {
		return this.eventId.hashCode();
	}

	public String toString() {
		return this.eventId.toString();
	}

	public boolean equals(Object object) {
		if(!(object instanceof EventId)){
			throw new IllegalArgumentException
			("比較する値がイベントIDではありません。[" + object!=null ? null : object.getClass() + "]");
		}
		EventId id = (EventId)object;
		return this.eventId.equals(id.value());
	}

}
