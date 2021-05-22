package yabomu.album.presentation.todolist.viewadapter;

import java.util.ArrayList;
import java.util.List;

import yabomu.album.domain.model.todolist.ReminderConfig;

/**
 * <pre>
 * Viewとのアダプター用クラス
 * ※domain配下のパッケージでは使用しないこと。
 *
 * ※本当はドメイン層から見えなくしたかったが、
 * Javaアクセス修飾子のパッケージスコープは、
 * 階層が違うだけでもスコープ外になってしまう。。。
 * </pre>
 * @author takku66
 * @version 1.0
 */
public class TodolistViewAdapter {

	private String todoId;
	private String title;
	private String content;
	private List<CheckListViewAdapter> checkList;
	private ReminderConfig.Time reminderTime;
	private ReminderConfig.Repeat reminderRepeat;
	private String scheduledStartDateTime;
	private String createUserName;
	private String createDateTime;
	private String updateUserName;
	private String updateDateTime;

	/**
	 * <pre>
	 * デフォルトコンストラクタ
	 * </pre>
	 */
	public TodolistViewAdapter() {
		this.checkList = new ArrayList<CheckListViewAdapter>();
	}
	/*
	 * MYNOTE:コンストラクタの引数にパラメータ指定したバージョンも作っていたけど、
	 * 画面に項目が追加されるたびにコンストラクタにパラメータ追加していくのは結構大変
	 */

	public String getTodoId() {
		return todoId;
	}

	public void setTodoId(String todoId) {
		this.todoId = todoId;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}

	public String getScheduledStartDateTime() {
		return scheduledStartDateTime;
	}

	public void setScheduledStartDateTime(String scheduledStartDateTime) {
		this.scheduledStartDateTime = scheduledStartDateTime;
	}

	public String getCreateUserName() {
		return createUserName;
	}

	public void setCreateUserName(String createUserName) {
		this.createUserName = createUserName;
	}

	public String getUpdateUserName() {
		return updateUserName;
	}

	public void setUpdateUserName(String updateUserName) {
		this.updateUserName = updateUserName;
	}

	public String getCreateDateTime() {
		return createDateTime;
	}

	public void setCreateDateTime(String createDateTime) {
		this.createDateTime = createDateTime;
	}

	public String getUpdateDateTime() {
		return updateDateTime;
	}

	public void setUpdateDateTime(String updateDateTime) {
		this.updateDateTime = updateDateTime;
	}

	public List<CheckListViewAdapter> getCheckList() {
		return checkList;
	}

	public void setCheckList(List<CheckListViewAdapter> checkList) {
		this.checkList = checkList;
	}

	public ReminderConfig.Time getReminderTime() {
		return reminderTime;
	}

	public void setReminderTime(int num) {
		this.reminderTime = ReminderConfig.Time.selectBy(num);
	}

	public ReminderConfig.Repeat getReminderRepeat() {
		return reminderRepeat;
	}

	public void setReminderRepeat(int num) {
		this.reminderRepeat = ReminderConfig.Repeat.selectBy(num);
	}



}
