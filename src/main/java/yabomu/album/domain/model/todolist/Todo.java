package yabomu.album.domain.model.todolist;

import yabomu.album.domain.model.user.YbmUser;
import yabomu.album.shared.valueobject.YbmDate;

/**
 * <pre>
 * TODOのデータ
 * </pre>
 * @author takku66
 * @version 1.0
 */
public class Todo {
	private String todoId;
	private String title;
	private String content;
	private YbmUser createUser;
	private YbmUser updateUser;
	private YbmDate createDateTime;
	private YbmDate updateDateTime;
	private YbmDate scheduledStartDateTime;

	public String todoId() {
		return todoId;
	}
	public String title() {
		return title;
	}
	public String content() {
		return content;
	}
	public String createUserName() {
		return createUser.name().toString();
	}
	public String updateUserName() {
		return updateUser.name().toString();
	}
	public String createDateTime() {
		return createDateTime.toSlashDate();
	}
	public String updateDateTime() {
		return updateDateTime.toSlashDate();
	}
	public String scheduledStartDateTime() {
		return scheduledStartDateTime.toSlashDate();
	}

}
