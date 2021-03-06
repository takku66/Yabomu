package yabomu.trip.domain.model.user;

import lombok.Builder;
import yabomu.trip.domain.valueobject.UserId;
import yabomu.trip.domain.valueobject.UserName;

/**
 * <pre>
 * ユーザーエンティティ
 * </pre>
 * @version 1.0
 */
@Builder
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
		this.id = new UserId(id.value());
		this.name = new UserName(name.value());
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
		this.id = new UserId(id.value());
		this.name = new UserName(name.value());
		this.email = email;
		this.tellNo = tellNo;
	}

	public long id() {
		return this.id.value();
	}
	public UserId userId() {
		return this.id;
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

	public void changeName(UserName name) {
		this.name = name;
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
