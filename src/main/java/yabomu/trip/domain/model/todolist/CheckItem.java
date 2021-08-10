package yabomu.trip.domain.model.todolist;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NonNull;
import yabomu.trip.domain.model.user.YbmUser;
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
	private Long todoId;
	@NonNull
	private Integer seq;
	private String content;
	@Builder.Default
	private boolean completed = false;
	private YbmUser createUser;
	private YbmUser updateUser;
	private YbmDate createDateTime;
	private YbmDate updateDateTime;


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
}
