package yabomu.trip.domain.model.todolist;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NonNull;
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
	private Long eventId;
	@NonNull
	private Long todoId;
	@NonNull
	private Integer seq;
	private String content;
	@Builder.Default
	private boolean completed = false;
	private YbmDate updateDateTime;


	public Long eventId() {
		return this.eventId;
	}
	public Long todoId() {
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


	public String updateDateTime() {
		return updateDateTime.toHyphenDate();
	}
}
