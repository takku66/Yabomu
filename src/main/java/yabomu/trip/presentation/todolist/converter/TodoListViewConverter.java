package yabomu.trip.presentation.todolist.converter;

import java.util.ArrayList;
import java.util.List;

import yabomu.trip.domain.model.todolist.CheckItem;
import yabomu.trip.domain.model.todolist.Todo;
import yabomu.trip.domain.model.user.YbmUser;
import yabomu.trip.domain.valueobject.UserId;
import yabomu.trip.domain.valueobject.UserName;
import yabomu.trip.domain.valueobject.YbmDate;
import yabomu.trip.presentation.todolist.viewadapter.CheckItemForm;
import yabomu.trip.presentation.todolist.viewadapter.TodoListForm;

/**
 * <pre>
 * View用オブジェクトとDomain用のオブジェクトの変換クラス
 * </pre>
 * @version 1.0
 */
public class TodoListViewConverter {

	private TodoListViewConverter() {
	}
	/**
	 * <pre>
	 * View用のオブジェクトに変換します
	 * </pre>
	 * @param todo
	 * @return TodoListForm
	 */
	static public TodoListForm toViewTodoList(Todo todo) {
		TodoListForm form = new TodoListForm();
		if(todo == null) {
			return form;
		}
		form.setEventId(todo.eventId());
		form.setTodoId(todo.todoId());
		form.setTitle(todo.title());
		form.setContent(todo.content());
		form.setCheckList(toViewCheckList(todo.checkList()));
		form.setReminderTimeEnum(todo.reminderTime());
		form.setReminderRepeatEnum(todo.reminderRepeat());
		form.setTodoStartDateTime(todo.todoStartDateTime());
		form.setCreateUserId(todo.createUser().id());
		form.setCreateUserName(todo.createUserName());
		form.setCreateDateTime(todo.createDateTime());
		form.setUpdateUserId(todo.updateUser().id());
		form.setUpdateUserName(todo.updateUserName());
		form.setUpdateDateTime(todo.updateDateTime());
		return form;
	}
	/**
	 * <pre>
	 * View用のオブジェクトに変換します
	 * </pre>
	 * @param todoList
	 * @return List<TodoListForm>
	 */
	static public List<TodoListForm> toViewTodoList(List<Todo> todoList) {
		List<TodoListForm> rtnList = new ArrayList<>();
		if(todoList == null) {
			return rtnList;
		}
		for(Todo todo : todoList) {
			rtnList.add(toViewTodoList(todo));
		}
		return rtnList;
	}
	/**
	 * <pre>
	 * View用のオブジェクトに変換します
	 * </pre>
	 * @param checkList
	 * @return List<CheckItemForm>
	 */
	static public List<CheckItemForm> toViewCheckList(List<CheckItem> checkList) {
		List<CheckItemForm> checkListForm = new ArrayList<>();
		if(checkList == null) {
			return checkListForm;
		}
		for(CheckItem checkItem : checkList) {
			CheckItemForm checkItemForm = new CheckItemForm();
			checkItemForm.setCheckListId(checkItem.checkListId());
			checkItemForm.setContent(checkItem.content());
			checkItemForm.setCompleted(checkItem.isCompleted());
			checkListForm.add(checkItemForm);
		}
		return checkListForm;
	}
	/**
	 * <pre>
	 * Domain用のオブジェクトに変換します
	 * </pre>
	 * @param form
	 * @return Todo
	 */
	static public Todo toDomainTodoList(TodoListForm form){
		if(form == null) {
			return null;
		}
		Todo todo = Todo.builder()
				.eventId(form.getEventId())
				.todoId(form.getTodoId())
				.title(form.getTitle())
				.content(form.getContent())
				.checkList(toDomainCheckList(form.getCheckList()))
				.reminderTime(form.getReminderTime())
				.reminderRepeat(form.getReminderRepeat())
				.createUser(new YbmUser(new UserId(form.getCreateUserId()), new UserName(form.getCreateUserName())))
				.createDateTime(new YbmDate(form.getCreateDateTime(), YbmDate.FmtPtn.HYPHEN_DATE))
				.updateUser(new YbmUser(new UserId(form.getUpdateUserId()), new UserName(form.getUpdateUserName())))
				.updateDateTime(new YbmDate(form.getUpdateDateTime(), YbmDate.FmtPtn.HYPHEN_DATE))
				.todoStartDateTime(new YbmDate(form.getTodoStartDateTime(), YbmDate.FmtPtn.HYPHEN_DATE))
				.build();
		return todo;
	}
	/**
	 * <pre>
	 * Domain用のオブジェクトに変換します
	 * </pre>
	 * @param todoList
	 * @return List<Todo>
	 */
	static public List<Todo> toDomainTodoList(List<TodoListForm> todoList){
		List<Todo> rtnList = new ArrayList<>();
		if(todoList == null) {
			return rtnList;
		}
		for(TodoListForm adapter : todoList) {
			rtnList.add(toDomainTodoList(adapter));
		}
		return rtnList;
	}
	/**
	 * <pre>
	 * Domain用のオブジェクトに変換します
	 * </pre>
	 * @param checkListAdapter
	 * @return List<CheckItem>
	 */
	static public List<CheckItem> toDomainCheckList(List<CheckItemForm> checkListAdapter) {
		List<CheckItem> checkList = new ArrayList<>();
		if(checkListAdapter == null) {
			return checkList;
		}
		for(CheckItemForm checkItemAdapter : checkListAdapter) {
			CheckItem checkItem = CheckItem.builder()
											.checkListId(checkItemAdapter.getCheckListId())
											.content(checkItemAdapter.getContent())
											.completed(checkItemAdapter.isCompleted())
											.build();
			checkList.add(checkItem);
		}
		return checkList;
	}

}
