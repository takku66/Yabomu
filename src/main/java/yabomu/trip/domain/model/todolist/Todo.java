package yabomu.trip.domain.model.todolist;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import yabomu.trip.domain.model.user.YbmUser;
import yabomu.trip.domain.valueobject.ReminderNoticeTime;
import yabomu.trip.domain.valueobject.ReminderRepeat;
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
	@lombok.NonNull
	private Long eventId;
	@lombok.NonNull
	private Long todoId;
	private YbmUser createUser;
	private YbmUser updateUser;
	private YbmDate createDateTime;
	private YbmDate updateDateTime;
	private String title;
	private String content;
	private List<CheckItem> checkList;
	private YbmDate todoStartDateTime;
	private YbmDate todoEndDateTime;
	private ReminderNoticeTime reminderNoticeTime;
	private ReminderRepeat reminderRepeat;


	public Long eventId() {
		return eventId;
	}
	public Long todoId() {
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
	public LocalDateTime createDateTime() {
		return createDateTime.value();
	}
	public String createDateTimeStr() {
		return createDateTime.toHyphenDateTimeMl3();
	}
	public LocalDateTime updateDateTime() {
		return updateDateTime.value();
	}
	public String updateDateTimeStr() {
		return updateDateTime.toHyphenDateTimeMl6();
	}
	public LocalDateTime todoStartDateTime() {
		return todoStartDateTime != null ? todoStartDateTime.value()
										: null;
	}
	public String todoStartDateTimeStr() {
		return todoStartDateTime != null ? todoStartDateTime.toHyphenDateTime()
										: "";
	}
	public LocalDateTime todoEndDateTime() {
		return todoEndDateTime != null ? todoEndDateTime.value()
										: null;
	}
	public String todoEndDateTimeStr() {
		return todoEndDateTime != null ? todoEndDateTime.toHyphenDateTime()
										: "";
	}

	public List<CheckItem> checkList(){
		return new ArrayList<CheckItem>(this.checkList);
	}
	public ReminderNoticeTime reminderNoticeTime(){
		return this.reminderNoticeTime;
	}
	public ReminderRepeat reminderRepeat(){
		return this.reminderRepeat;
	}

	public void addCheckList(CheckItem item) {
		if(this.checkList == null) {
			this.checkList = new ArrayList<>();
		}
		if(!this.todoId().equals(item.todoId())) {
			throw new IllegalArgumentException("違うTODOリストのチェックリストが挿入されています。" +
												"[追加先のtodoId=" + this.todoId() +
												"チェックリストのtodoId=" + item.todoId() + "]");
		}
		this.checkList.add(item);
	}
	public void addCheckList(List<CheckItem> checkList) {
		if(this.checkList == null) {
			this.checkList = new ArrayList<>();
		}
		this.checkList.addAll(checkList);
	}

}
