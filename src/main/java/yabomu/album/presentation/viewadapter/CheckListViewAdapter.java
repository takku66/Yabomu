package yabomu.album.presentation.viewadapter;

/**
 * <pre>
 * Viewとのアダプタークラス
 * チェックリスト
 * </pre>
 * @author takku66
 * @version 1.0
 */
public class CheckListViewAdapter {

	private String listId;
	private String content;
	private boolean completed;

	/**
	 * <pre>
	 * デフォルトコンストラクタ
	 * </pre>
	 */
	public CheckListViewAdapter() {
	}

	/**
	 * <pre>
	 * パラメータ指定用コンストラクタ
	 * </pre>
	 * @param listId
	 * @param content
	 * @param completed
	 */
	public CheckListViewAdapter(String listId,
								String content,
								boolean completed) {
		this.listId = listId;
		this.content = content;
		this.completed = completed;
	}

	public String getListId() {
		return listId;
	}

	public void setListId(String listId) {
		this.listId = listId;
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
