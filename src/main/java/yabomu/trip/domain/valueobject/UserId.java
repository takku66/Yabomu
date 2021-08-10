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
		if(id == null) {
			throw new IllegalArgumentException("ユーザーIDが空です。");
		}
		this.id = id;
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
		UserId userId = (UserId)object;
		return this.id.equals(userId.value());
	}

}
