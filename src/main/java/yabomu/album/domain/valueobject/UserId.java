package yabomu.album.domain.valueobject;

import java.util.UUID;

/**
 * <pre>
 * ユーザーID
 * </pre>
 * @version 1.0
 */
public class UserId {

	private String id;

	/**<pre>
	 * 新しいIDを生成する
	 * </pre>
	 */
	public UserId() {
		this.id = UUID.randomUUID().toString();
	}
	/**<pre>
	 * 引数に渡されたIDを設定する
	 * </pre>
	 */
	public UserId(String id) {
		if(id == null || id.isBlank()) {
			throw new IllegalArgumentException("ユーザーIDが空です。");
		}
		this.id = id;
	}

	public String value() {
		return this.id;
	}

	public int hashCode() {
		return id.hashCode();
	}

	public String toString() {
		return this.id;
	}

	public boolean equals(Object object) {
		UserId userId = (UserId)object;
		return this.id.equals(userId.value());
	}

}
