package yabomu.album.domain.valueobject;

/**
 * <pre>
 * ユーザーID
 * </pre>
 * @version 1.0
 */
public class UserName {

	private String name;

	/**<pre>
	 * 名前を設定する
	 * </pre>
	 */
	public UserName(String name) {
		// スペース文字含む空文字もエラーとする
		if(name == null || name.isBlank()) {
			throw new IllegalArgumentException("ユーザー名がnull、もしくは空です。");
		}
		this.name = name;
	}

	public String value() {
		return this.name;
	}

	@Override
	public int hashCode() {
		return name.hashCode();
	}

	@Override
	public String toString() {
		return this.name;
	}

}
