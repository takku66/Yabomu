package yabomu.album.shared.valueobject;

import java.util.UUID;

/**
 * <pre>
 * ユーザーID
 * </pre>
 * @version 1.0
 */
public class UserId implements YBM_VO {

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
		this.id = id;
	}

	@Override
	public int hashCode() {
		return id.hashCode();
	}

	@Override
	public String toString() {
		return this.id;
	}

}
