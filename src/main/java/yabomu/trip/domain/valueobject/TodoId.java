package yabomu.trip.domain.valueobject;

import yabomu.trip.shared.YbmIdGenerator;

/**
 * <pre>
 * TodoID
 * </pre>
 * @version 1.0
 */
public class TodoId {

	private Long todoId;

	/**<pre>
	 * 新しいIDを生成する
	 * </pre>
	 */
	public TodoId() {
		this.todoId = YbmIdGenerator.generate();
	}
	/**<pre>
	 * 引数に渡されたIDを設定する
	 * </pre>
	 */
	public TodoId(Long id) {
		if(id == null || id.longValue() <= 0) {
			throw new IllegalArgumentException("TodoIDが不正です。[" + id + "]");
		}
		this.todoId = id;
	}
	public TodoId(String id) {
		if(id == null || "".equals(id)) {
			throw new IllegalArgumentException("TodoIDが不正です。[" + id + "]");
		}
		this.todoId = Long.valueOf(id);
	}
	

	public long value() {
		return this.todoId;
	}

	public int hashCode() {
		return this.todoId.hashCode();
	}

	public String toString() {
		return this.todoId.toString();
	}

	public boolean equals(Object object) {
		if(!(object instanceof TodoId)){
			throw new IllegalArgumentException
			("比較する値がTodoIDではありません。[" + object!=null ? null : object.getClass() + "]");
		}
		TodoId id = (TodoId)object;
		return this.todoId.equals(id.value());
	}

}
