package yabomu.trip.domain.valueobject;

import yabomu.trip.shared.YbmIdGenerator;

/**
 * <pre>
 * ユーザーID
 * </pre>
 * @version 1.0
 */
public class UserId {

	private Long id;

	/**<pre>
	 * 新しいIDを生成する
	 * </pre>
	 */
	public UserId() {
		this.id = YbmIdGenerator.generate();
	}
	/**<pre>
	 * 引数に渡されたIDを設定する
	 * </pre>
	 */
	public UserId(Long id) {
		if(id == null || id.longValue() <= 0) {
			throw new IllegalArgumentException("ユーザーIDが不正です。[" + id + "]");
		}
		this.id = id;
	}
	public UserId(String id) {
		if(id == null || "".equals(id)) {
			throw new IllegalArgumentException("ユーザーIDが不正です。[" + id + "]");
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
		if(!(object instanceof UserId)){
			throw new IllegalArgumentException
			("比較する値がユーザーIDではありません。[" + object!=null ? null : object.getClass() + "]");
		}
		UserId id = (UserId)object;
		return this.id.equals(id.value());
	}

}
