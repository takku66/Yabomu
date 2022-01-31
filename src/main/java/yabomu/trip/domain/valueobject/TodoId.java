package yabomu.trip.domain.valueobject;

import yabomu.trip.shared.YbmIdGenerator;

/**
 * <pre>
 * TodoID
 * </pre>
 * @version 1.0
 */
public class TodoId {

	private Long id;

	/**<pre>
	 * 新しいIDを生成する
	 * </pre>
	 */
	public TodoId() {
		this.id = YbmIdGenerator.generate();
	}
	/**<pre>
	 * 引数に渡されたIDを設定する
	 * </pre>
	 */
	public TodoId(Long id) {
		if(id == null || id.longValue() <= 0) {
			throw new IllegalArgumentException("TodoIDが不正です。[" + id + "]");
		}
		this.id = id;
	}
	public TodoId(String id) {
		if(id == null || "".equals(id)) {
			throw new IllegalArgumentException("TodoIDが不正です。[" + id + "]");
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
		if(!(object instanceof TodoId)){
			throw new IllegalArgumentException
			("比較する値がTodoIDではありません。[" + object!=null ? null : object.getClass() + "]");
		}
		TodoId id = (TodoId)object;
		return this.id.equals(id.value());
	}

}
