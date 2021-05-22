package yabomu.album.domain.model.user;

import yabomu.album.shared.valueobject.UserId;
import yabomu.album.shared.valueobject.UserName;

/**
 * <pre>
 * ユーザーエンティティ
 * </pre>
 * @author tatta
 * @version 1.0
 */
public class YbmUser {

	private UserId id;
	private UserName name;
	private String email;
	private String tellNo;

	/**
	 * <pre>
	 * IDと名前だけで構築する
	 * </pre>
	 * @param id
	 * @param name
	 */
	public YbmUser(UserId id, UserName name) {
		this.id = new UserId(id.toString());
		this.name = new UserName(name.toString());
	}
	/**
	 * <pre>
	 * 全てのプロパティをまとめて構築する
	 * </pre>
	 * @param id
	 * @param name
	 * @param email
	 * @param tellNo
	 */
	public YbmUser(UserId id, UserName name, String email, String tellNo) {
		this.id = new UserId(id.toString());
		this.name = new UserName(name.toString());
		this.email = email;
		this.tellNo = tellNo;
	}

	public String name() {
		return name.toString();
	}
	public String email() {
		return email;
	}
	public String tellNo() {
		return tellNo;
	}

	public void changeEmail(String email) {
		this.email = email;
	}

	public void changeTellNo(String tellNo) {
		this.tellNo = tellNo;
	}

	public String toString() {
		return "UserId=" + id.toString() +
				", UserName=" + name.toString() +
				", email=" + email +
				", tellNo=" + tellNo;
	}
}
