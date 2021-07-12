package yabomu.trip.domain.model.todolist;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;

/**
 * <pre>
 * チェックリストのクラス
 * </pre>
 * @version 1.0
 */
@Builder
@AllArgsConstructor(access = AccessLevel.PRIVATE)
public class CheckItem {
	private String checkListId;
	private String content;
	@Builder.Default
	private boolean completed = false;


	public String checkListId() {
		return this.checkListId;
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

}
