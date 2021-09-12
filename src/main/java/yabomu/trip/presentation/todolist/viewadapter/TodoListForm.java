package yabomu.trip.presentation.todolist.viewadapter;

import java.util.ArrayList;
import java.util.List;

import lombok.Data;
import yabomu.trip.domain.valueobject.ReminderNoticeTime;
import yabomu.trip.domain.valueobject.ReminderRepeat;

/**
 * <pre>
 * Viewとのアダプター用クラス
 * ※domain配下のパッケージでは使用しないこと。
 *
 * ※本当はドメイン層から見えなくしたかったが、
 * Javaアクセス修飾子のパッケージスコープは、
 * 階層が違うだけでもスコープ外になってしまう。。。
 * </pre>
 * @version 1.0
 */
@Data
public class TodoListForm {
	private String eventId;
	private String todoId;
	private String createUserId;
	private String createUserName;
	private String createDateTime;
	private String updateUserId;
	private String updateUserName;
	private String updateDateTime;
	private String title;
	private String content;
	private List<CheckItemForm> checkList;
	private String todoStartDateTime;
	private String todoEndDateTime;
	private ReminderRepeat reminderRepeat;
	private ReminderNoticeTime reminderNoticeTime;

	/**
	 * <pre>
	 * デフォルトコンストラクタ
	 * </pre>
	 */
	public TodoListForm() {
		this.checkList = new ArrayList<CheckItemForm>();
	}
	/*
	 * MYNOTE:コンストラクタの引数にパラメータ指定したバージョンも作っていたけど、
	 * 画面に項目が追加されるたびにコンストラクタにパラメータ追加していくのは結構大変
	 */


	/*
	 * ReminderTime
	 */
	public void setReminderNoticeTimeEnum(ReminderNoticeTime reminderNoticeTimeEnum) {
		this.reminderNoticeTime = reminderNoticeTimeEnum;
	}
	/*
	 * ReminderRepeat
	 */
	public void setReminderRepeatEnum(ReminderRepeat reminderRepeatEnum) {
		this.reminderRepeat = reminderRepeatEnum;
	}



}
