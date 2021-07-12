package yabomu.trip.domain.model.todolist;

import java.util.ArrayList;
import java.util.List;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import yabomu.trip.domain.model.user.YbmUser;
import yabomu.trip.domain.valueobject.YbmDate;

/**
 * <pre>
 * TODOのデータ
 * </pre>
 * @version 1.0
 */
@Builder
@AllArgsConstructor(access = AccessLevel.PRIVATE)
public class Todo {
	private String todoId;
	private String title;
	private String content;
	private List<CheckItem> checkList;
	private ReminderConfig.Time reminderTime;
	private ReminderConfig.Repeat reminderRepeat;
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
	public YbmUser createUser() {
		return createUser;
	}
	public String createUserName() {
		return createUser.name().toString();
	}
	public YbmUser updateUser() {
		return updateUser;
	}
	public String updateUserName() {
		return updateUser.name().toString();
	}
	public String createDateTime() {
		return createDateTime.toHyphenDate();
	}
	public String updateDateTime() {
		return updateDateTime.toHyphenDate();
	}
	public String scheduledStartDateTime() {
		return scheduledStartDateTime.toHyphenDate();
	}

	public List<CheckItem> checkList(){
		return new ArrayList<CheckItem>(this.checkList);
	}
	public ReminderConfig.Time reminderTime(){
		return this.reminderTime;
	}
	public ReminderConfig.Repeat reminderRepeat(){
		return this.reminderRepeat;
	}

	public String createDateTime(YbmDate.FmtPtn ptn) {
		return createDateTime.valueOf(ptn);
	}
	public String updateDateTime(YbmDate.FmtPtn ptn) {
		return updateDateTime.valueOf(ptn);
	}
	public String scheduledStartDateTime(YbmDate.FmtPtn ptn) {
		return scheduledStartDateTime.valueOf(ptn);
	}


}
