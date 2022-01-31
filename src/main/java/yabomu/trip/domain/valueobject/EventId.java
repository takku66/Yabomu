package yabomu.trip.domain.valueobject;

import yabomu.trip.shared.YbmIdGenerator;

/**
 * <pre>
 * イベントID
 * </pre>
 * @version 1.0
 */
public class EventId {

	private Long id;

	/**<pre>
	 * 新しいIDを生成する
	 * </pre>
	 */
	public EventId() {
		this.id = YbmIdGenerator.generate();
	}
	/**<pre>
	 * 引数に渡されたIDを設定する
	 * </pre>
	 */
	public EventId(Long id) {
		if(id == null || id.longValue() <= 0) {
			throw new IllegalArgumentException("イベントIDが不正です。[" + id + "]");
		}
		this.id = id;
	}
	public EventId(String id) {
		if(id == null || "".equals(id)) {
			throw new IllegalArgumentException("イベントIDが不正です。[" + id + "]");
		}
		this.id = Long.valueOf(id);
	}

	public long value() {
		return this.id;
	}

	public int hashCode() {
		return id.hashCode();
	}

	public String toString() {
		return this.id.toString();
	}

	public boolean equals(Object object) {
		if(!(object instanceof EventId)){
			throw new IllegalArgumentException
			("比較する値がイベントIDではありません。[" + object!=null ? null : object.getClass() + "]");
		}
		EventId id = (EventId)object;
		return this.id.equals(id.value());
	}

}
