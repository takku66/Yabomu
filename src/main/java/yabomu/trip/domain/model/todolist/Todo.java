package yabomu.trip.domain.model.todolist;

import java.util.ArrayList;
import java.util.List;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import yabomu.trip.domain.model.user.YbmUser;
import yabomu.trip.domain.valueobject.ReminderRepeat;
import yabomu.trip.domain.valueobject.ReminderTime;
import yabomu.trip.domain.valueobject.ReminderType;
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
	private String eventId;
	private String todoId;
	private YbmUser createUser;
	private YbmUser updateUser;
	private YbmDate createDateTime;
	private YbmDate updateDateTime;
	private String title;
	private String content;
	private List<CheckItem> checkList;
	private YbmDate todoStartDateTime;
	private YbmDate todoEndDateTime;
	private ReminderType reminderType;
	private YbmDate reminderStartDateTime;
	private YbmDate reminderEndDateTime;
	private ReminderTime reminderTime;
	private ReminderRepeat reminderRepeat;


	public String eventId() {
		return eventId;
	}
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
	public String todoStartDateTime() {
		return todoStartDateTime.toHyphenDate();
	}
	public String todoEndDateTime() {
		return todoEndDateTime.toHyphenDate();
	}

	public List<CheckItem> checkList(){
		return new ArrayList<CheckItem>(this.checkList);
	}
	public ReminderType reminderType(){
		return this.reminderType;
	}
	public ReminderTime reminderTime(){
		return this.reminderTime;
	}
	public ReminderRepeat reminderRepeat(){
		return this.reminderRepeat;
	}
	public String reminderStartDateTime() {
		return reminderStartDateTime.toHyphenDate();
	}
	public String reminderEndDateTime() {
		return reminderEndDateTime.toHyphenDate();
	}

}
