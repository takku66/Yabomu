package yabomu.trip.presentation.session;

import org.springframework.context.annotation.Scope;
import org.springframework.context.annotation.ScopedProxyMode;
import org.springframework.stereotype.Component;

/**
 * <pre>
 * セッション管理クラス
 * </pre>
 * @version 1.0
 */
@Component
@Scope(value = "session", proxyMode = ScopedProxyMode.TARGET_CLASS)
public class YbmSession {

	/** 現在表示中の画面 */
	private String nowShowingItem;

	public YbmSession() {

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
