package yabomu.trip.presentation.session;

import java.io.Serializable;

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
public class YbmSession implements Serializable {

	/** 現在表示中の画面 */
	private String nowShowingMenu;

	public YbmSession() {

	}

	/**
	 * <pre>
	 * 現在表示中の画面IDを返す
	 * </pre>
	 * @return
	 */
	public String getNowShowingMenu() {
		return this.nowShowingMenu;
	}
	/**
	 * <pre>
	 * 現在表示中の画面IDを設定する
	 * </pre>
	 * @param nowShowingMenu
	 */
	public void setNowShowingMenu(String nowShowingMenu) {
		this.nowShowingMenu = nowShowingMenu;
	}

}
