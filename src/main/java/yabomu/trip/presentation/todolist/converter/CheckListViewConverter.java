package yabomu.trip.presentation.todolist.converter;

import java.util.ArrayList;
import java.util.List;

import yabomu.trip.domain.model.todolist.CheckItem;
import yabomu.trip.domain.valueobject.EventId;
import yabomu.trip.domain.valueobject.TodoId;
import yabomu.trip.domain.valueobject.UserId;
import yabomu.trip.domain.valueobject.YbmDate;
import yabomu.trip.domain.valueobject.YbmDate.FmtPtn;
import yabomu.trip.presentation.todolist.viewadapter.CheckItemForm;

/**
 * <pre>
 * View用オブジェクトとDomain用のオブジェクトの変換クラス
 * </pre>
 * @version 1.0
 */
public class CheckListViewConverter {

	private CheckListViewConverter() {
	}
	/**
	 * <pre>
	 * View用のオブジェクトに変換します
	 * </pre>
	 * @param checkItem
	 * @return CheckItemForm
	 */
	static public CheckItemForm toView(CheckItem checkItem) {
		CheckItemForm form = new CheckItemForm();
		if(checkItem == null) {
			return form;
		}
		form.setEventId(checkItem.eventId().toString());
		form.setTodoId(checkItem.todoId().toString());
		form.setSeq(checkItem.seq().toString());
		form.setContent(checkItem.content());
		form.setCompleted(checkItem.isCompleted());
		form.setCreateUserId(checkItem.createUserId().toString());
		form.setCreateDateTime(checkItem.createDateTime());
		form.setUpdateUserId(checkItem.updateUserId().toString());
		form.setUpdateDateTime(checkItem.updateDateTime());
		return form;
	}
	/**
	 * <pre>
	 * View用のオブジェクトに変換します
	 * </pre>
	 * @param checkList
	 * @return List<CheckItemForm>
	 */
	static public List<CheckItemForm> toView(List<CheckItem> checkList) {
		List<CheckItemForm> rtnList = new ArrayList<>();
		if(checkList == null) {
			return rtnList;
		}
		for(CheckItem elm : checkList) {
			rtnList.add(toView(elm));
		}
		return rtnList;
	}
	/**
	 * <pre>
	 * Domain用のオブジェクトに変換します
	 * </pre>
	 * @param form
	 * @return CheckItem
	 */
	static public CheckItem toDomain(CheckItemForm form){
		if(form == null) {
			return null;
		}
		CheckItem checkItem = CheckItem.builder()
				.eventId(new EventId(form.getEventId()))
				.todoId(new TodoId(form.getTodoId()))
				.seq(Integer.valueOf(form.getSeq()))
				.content(form.getContent())
				.completed(form.isCompleted())
				.createUserId(new UserId(form.getCreateUserId()))
				.createDateTime(new YbmDate(form.getUpdateDateTime(), FmtPtn.HYPHEN_DATE_TIMEML6))
				.updateUserId(new UserId(form.getUpdateUserId()))
				.updateDateTime(new YbmDate(form.getUpdateDateTime(), FmtPtn.HYPHEN_DATE_TIMEML6))
				.build();
		return checkItem;
	}
	/**
	 * <pre>
	 * Domain用のオブジェクトに変換します
	 * </pre>
	 * @param checkList
	 * @return List<Todo>
	 */
	static public List<CheckItem> toDomain(List<CheckItemForm> checkList){
		List<CheckItem> rtnList = new ArrayList<>();
		if(checkList == null) {
			return rtnList;
		}
		for(CheckItemForm form : checkList) {
			rtnList.add(toDomain(form));
		}
		return rtnList;
	}

}
