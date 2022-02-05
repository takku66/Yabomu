package yabomu.trip.presentation.session;

import java.io.Serializable;

import org.springframework.context.annotation.Scope;
import org.springframework.context.annotation.ScopedProxyMode;
import org.springframework.stereotype.Component;
import org.springframework.web.context.annotation.SessionScope;

import yabomu.trip.domain.model.user.YbmUser;
import yabomu.trip.domain.valueobject.UserId;
import yabomu.trip.domain.valueobject.UserName;


/**
 * <pre>
 * セッション管理クラス
 * </pre>
 * @version 1.0
 */
@Component
@SessionScope
public class YbmSession implements Serializable {

	/** ユーザー情報 */
	private YbmUser loginUser;
	
	/** 現在表示中の画面 */
	private String nowShowingMenu;

	public YbmSession() {
		
	}

	public UserId loginUserId(){
		return this.loginUser.userId();
	}

	public void setLoginUserInfo(YbmUser loginUser){
		this.loginUser = loginUser;
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
