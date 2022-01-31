package yabomu.trip.domain.model.todolist;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import yabomu.trip.domain.valueobject.EventId;
import yabomu.trip.domain.valueobject.ReminderNoticeTime;
import yabomu.trip.domain.valueobject.ReminderRepeat;
import yabomu.trip.domain.valueobject.TodoId;
import yabomu.trip.domain.valueobject.UserId;
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
	private EventId eventId;
	@lombok.NonNull
	private TodoId todoId;
	private UserId createUserId;
	private UserId updateUserId;
	private YbmDate createDateTime;
	private YbmDate updateDateTime;
	private String title;
	private String content;
	private List<CheckItem> checkList;
	private YbmDate todoStartDateTime;
	private YbmDate todoEndDateTime;
	private ReminderNoticeTime reminderNoticeTime;
	private ReminderRepeat reminderRepeat;

	public Todo(TodoId todoId, Todo todo){
		this.eventId = todo.eventId();
		this.todoId = todoId;
		this.createUserId = todo.createUserId();
		this.updateUserId = todo.updateUserId();
		this.createDateTime = new YbmDate(todo.createDateTime());
		this.updateDateTime = new YbmDate(todo.updateDateTime());
		this.title = todo.title();
		this.content = todo.content();
		this.checkList = todo.checkList();
		this.todoStartDateTime = new YbmDate(todo.todoStartDateTime());
		this.todoEndDateTime = new YbmDate(todo.todoEndDateTime());
		this.reminderNoticeTime = todo.reminderNoticeTime();
		this.reminderRepeat = todo.reminderRepeat();
	}


	public EventId eventId() {
		return eventId;
	}
	public TodoId todoId() {
		return todoId;
	}
	public String title() {
		return title;
	}
	public String content() {
		return content;
	}
	public UserId createUserId() {
		return createUserId;
	}
	
	public UserId updateUserId() {
		return updateUserId;
	}
	
	public LocalDateTime createDateTime() {
		return createDateTime.value();
	}
	public String createDateTimeStr() {
		return createDateTime.valueOf(YbmDate.FmtPtn.HYPHEN_DATE_TIMEML6);
	}
	public LocalDateTime updateDateTime() {
		return updateDateTime.value();
	}
	public String updateDateTimeStr() {
		return updateDateTime.valueOf(YbmDate.FmtPtn.HYPHEN_DATE_TIMEML6);
	}
	public LocalDateTime todoStartDateTime() {
		return todoStartDateTime != null ? todoStartDateTime.value()
										: null;
	}
	public String todoStartDateTimeStr() {
		return todoStartDateTime != null ? todoStartDateTime.valueOf(YbmDate.FmtPtn.HYPHEN_DATE_HOUR_MINUTES)
										: "";
	}
	public String todoStartDateStr() {
		return todoStartDateTime != null ? todoStartDateTime.valueOf(YbmDate.FmtPtn.HYPHEN_DATE)
				: "";
	}
	public String todoStartTimeStr() {
		return todoStartDateTime != null ? todoStartDateTime.valueOf(YbmDate.FmtPtn.TIME_HHMM)
				: "";
	}
	public LocalDateTime todoEndDateTime() {
		return todoEndDateTime != null ? todoEndDateTime.value()
										: null;
	}
	public String todoEndDateTimeStr() {
		return todoEndDateTime != null ? todoEndDateTime.valueOf(YbmDate.FmtPtn.HYPHEN_DATE_HOUR_MINUTES)
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
