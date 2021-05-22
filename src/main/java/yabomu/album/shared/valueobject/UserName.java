package yabomu.album.shared.valueobject;

/**
 * <pre>
 * ユーザーID
 * </pre>
 * @version 1.0
 */
public class UserName implements YBM_VO {

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

	@Override
	public int hashCode() {
		return name.hashCode();
	}

	@Override
	public String toString() {
		return this.name;
	}

}
