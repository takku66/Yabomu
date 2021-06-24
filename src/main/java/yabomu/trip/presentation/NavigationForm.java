package yabomu.trip.presentation;

/**
 * <pre>
 * ナビゲーション用フォーム
 * </pre>
 * @version 1.0
 */
// TODO どのクラスに配置すべきか、実際にやってみて最適な場所があれば適宜移動させていく
public class NavigationForm {
	/** 現在表示中の画面 */
	private String nowShowingItem;

	public NavigationForm() {

	}

	/**
	 * <pre>
	 * 現在表示中の画面IDを返す
	 * </pre>
	 * @return
	 */
	public String getNowShowingItem() {
		return this.nowShowingItem;
	}
	/**
	 * <pre>
	 * 現在表示中の画面IDを設定する
	 * </pre>
	 * @param nowShowingItem
	 */
	public void setNowShowingItem(String nowShowingItem) {
		this.nowShowingItem = nowShowingItem;
	}
}
