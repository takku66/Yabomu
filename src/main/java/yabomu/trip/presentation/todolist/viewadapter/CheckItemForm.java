package yabomu.trip.presentation.todolist.viewadapter;

import lombok.Data;

/**
 * <pre>
 * Viewとのアダプタークラス
 * チェックリスト
 * </pre>
 * @author takku66
 * @version 1.0
 */
@Data
public class CheckItemForm {
	private String eventId;
	private String todoId;
	private String seq;
	private String content;
	private boolean completed;
	private String createUserId;
	private String createUserName;
	private String createDateTime;
	private String updateUserId;
	private String updateUserName;
	private String updateDateTime;

}
