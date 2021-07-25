package yabomu.trip.presentation.todolist.viewadapter;

/**
 * <pre>
 * Viewとのアダプタークラス
 * チェックリスト
 * </pre>
 * @author takku66
 * @version 1.0
 */
public class CheckItemForm {

	private String checkListId;
	private String content;
	private boolean completed;

	/**
	 * <pre>
	 * デフォルトコンストラクタ
	 * </pre>
	 */
	public CheckItemForm() {
	}

	/**
	 * <pre>
	 * パラメータ指定用コンストラクタ
	 * </pre>
	 * @param listId
	 * @param content
	 * @param completed
	 */
	public CheckItemForm(String listId,
								String content,
								boolean completed) {
		this.checkListId = listId;
		this.content = content;
		this.completed = completed;
	}

	public String getCheckListId() {
		return checkListId;
	}

	public void setCheckListId(String checkListId) {
		this.checkListId = checkListId;
	}

	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}

	public boolean isCompleted() {
		return completed;
	}

	public void setCompleted(boolean completed) {
		this.completed = completed;
	}



}
