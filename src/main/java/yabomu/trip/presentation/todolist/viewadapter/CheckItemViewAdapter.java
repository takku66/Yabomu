package yabomu.trip.presentation.todolist.viewadapter;

/**
 * <pre>
 * Viewとのアダプタークラス
 * チェックリスト
 * </pre>
 * @author takku66
 * @version 1.0
 */
public class CheckItemViewAdapter {

	private String checkListId;
	private String content;
	private boolean completed;

	/**
	 * <pre>
	 * デフォルトコンストラクタ
	 * </pre>
	 */
	public CheckItemViewAdapter() {
	}

	/**
	 * <pre>
	 * パラメータ指定用コンストラクタ
	 * </pre>
	 * @param listId
	 * @param content
	 * @param completed
	 */
	public CheckItemViewAdapter(String listId,
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
