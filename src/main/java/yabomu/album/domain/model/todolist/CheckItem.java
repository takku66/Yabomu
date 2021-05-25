package yabomu.album.domain.model.todolist;

/**
 * <pre>
 * チェックリストのクラス
 * </pre>
 * @author takku66
 * @version 1.0
 */
public class CheckItem {
	private String checkListId;
	private String content;
	private boolean completed;

	public CheckItem(String checkListId) {
		this.checkListId = checkListId;
		this.completed = false;
	}
	public CheckItem(String checkListId,
					String content,
					boolean completed) {
		this.checkListId = checkListId;
		this.content = content;
		this.completed = completed;
	}

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
