package yabomu.trip.presentation.todolist.converter;

import java.util.ArrayList;
import java.util.List;

import yabomu.trip.domain.model.todolist.CheckItem;
import yabomu.trip.domain.model.user.YbmUser;
import yabomu.trip.domain.valueobject.UserId;
import yabomu.trip.domain.valueobject.UserName;
import yabomu.trip.domain.valueobject.YbmDate;
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
		form.setTodoId(checkItem.todoId().toString());
		form.setSeq(checkItem.seq().toString());
		form.setContent(checkItem.content());
		form.setCreateUserId(Long.toString(checkItem.createUser().id()));
		form.setCreateUserName(checkItem.createUserName());
		form.setCreateDateTime(checkItem.createDateTime());
		form.setUpdateUserId(Long.toString(checkItem.updateUser().id()));
		form.setUpdateUserName(checkItem.updateUserName());
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
				.todoId(Long.valueOf(form.getTodoId()))
				.seq(Integer.valueOf(form.getSeq()))
				.content(form.getContent())
				.createUser(new YbmUser(new UserId(Long.valueOf(form.getCreateUserId())), new UserName(form.getCreateUserName())))
				.createDateTime(new YbmDate(form.getCreateDateTime(), YbmDate.FmtPtn.HYPHEN_DATE))
				.updateUser(new YbmUser(new UserId(Long.valueOf(form.getUpdateUserId())), new UserName(form.getUpdateUserName())))
				.updateDateTime(new YbmDate(form.getUpdateDateTime(), YbmDate.FmtPtn.HYPHEN_DATE))
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
