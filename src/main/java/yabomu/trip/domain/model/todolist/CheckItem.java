package yabomu.trip.domain.model.todolist;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NonNull;
import yabomu.trip.domain.valueobject.EventId;
import yabomu.trip.domain.valueobject.TodoId;
import yabomu.trip.domain.valueobject.UserId;
import yabomu.trip.domain.valueobject.YbmDate;

/**
 * <pre>
 * チェックリストのクラス
 * </pre>
 * @version 1.0
 */
@Builder
@AllArgsConstructor(access = AccessLevel.PRIVATE)
public class CheckItem {
	@NonNull
	private EventId eventId;
	@NonNull
	private TodoId todoId;
	@NonNull
	private Integer seq;
	private String content;
	@Builder.Default
	private boolean completed = false;
	private UserId createUserId;
	private YbmDate createDateTime;
	private UserId updateUserId;
	private YbmDate updateDateTime;


	public EventId eventId() {
		return this.eventId;
	}
	public TodoId todoId() {
		return this.todoId;
	}
	public Integer seq() {
		return this.seq;
	}
	public String content() {
		return this.content;
	}
	public boolean isCompleted() {
		return this.completed;
	}
	public void changeContent(String content) {
		this.content = content;
	}
	public void complete() {
		this.completed = true;
	}
	public void incomplete() {
		this.completed = false;
	}
	public UserId updateUserId() {
		return this.updateUserId;
	}
	public UserId createUserId() {
		return this.createUserId;
	}
	public String createDateTime() {
		return this.createDateTime.valueOf(YbmDate.FmtPtn.HYPHEN_DATE_TIMEML6);
	}
	public String updateDateTime() {
		return this.updateDateTime.valueOf(YbmDate.FmtPtn.HYPHEN_DATE_TIMEML6);
	}

	/**
	 * ユーザー情報や作成日時以外で等しければ、trueを返す
	 */
	public boolean equals(CheckItem checkItem){
		if(!checkItem.eventId().equals	(this.eventId)) return false;
		if(!checkItem.todoId().equals	(this.todoId)) return false;
		if(!checkItem.seq().equals		(this.seq)) return false;
		if(!checkItem.content().equals	(this.content)) return false;
		if(!checkItem.isCompleted() == 	this.completed) return false;
		return true;
	}

}
