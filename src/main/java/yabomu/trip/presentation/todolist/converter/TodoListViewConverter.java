package yabomu.trip.presentation.todolist.converter;

import java.util.ArrayList;
import java.util.List;

import yabomu.trip.domain.model.todolist.Todo;
import yabomu.trip.domain.model.todolist.TodoList;
import yabomu.trip.domain.model.user.YbmUser;
import yabomu.trip.domain.valueobject.EventId;
import yabomu.trip.domain.valueobject.TodoId;
import yabomu.trip.domain.valueobject.UserId;
import yabomu.trip.domain.valueobject.UserName;
import yabomu.trip.domain.valueobject.YbmDate;
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
	static public TodoListForm toView(Todo todo) {
		TodoListForm form = new TodoListForm();
		if(todo == null) {
			return form;
		}
		form.setEventId(todo.eventId().toString());
		form.setTodoId(todo.todoId().toString());
		form.setTitle(todo.title());
		form.setContent(todo.content());
		form.setCheckList(CheckListViewConverter.toView(todo.checkList()));
		form.setReminderNoticeTimeEnum(todo.reminderNoticeTime());
		form.setReminderRepeatEnum(todo.reminderRepeat());
		form.setTodoStartDate(todo.todoStartDateStr());
		form.setTodoStartTime(todo.todoStartTimeStr());
		form.setCreateUserId(Long.toString(todo.createUser().id()));
		form.setCreateUserName(todo.createUserName());
		form.setCreateDateTime(todo.createDateTimeStr());
		form.setUpdateUserId(Long.toString(todo.updateUser().id()));
		form.setUpdateUserName(todo.updateUserName());
		form.setUpdateDateTime(todo.updateDateTimeStr());
		return form;
	}
	/**
	 * <pre>
	 * View用のオブジェクトに変換します
	 * </pre>
	 * @param todoList
	 * @return List<TodoListForm>
	 */
	static public List<TodoListForm> toView(TodoList todoList) {
		List<TodoListForm> rtnList = new ArrayList<>();
		if(todoList == null) {
			return rtnList;
		}
		for(Todo todo : todoList) {
			rtnList.add(toView(todo));
		}
		return rtnList;
	}
	/**
	 * <pre>
	 * Domain用のオブジェクトに変換します
	 * </pre>
	 * @param form
	 * @return Todo
	 */
	static public Todo toDomain(TodoListForm form){
		if(form == null) {
			return null;
		}
		Todo todo = Todo.builder()
				.eventId(new EventId(form.getEventId()))
				.todoId(new TodoId(form.getTodoId()))
				.title(form.getTitle())
				.content(form.getContent())
				.checkList(CheckListViewConverter.toDomain(form.getCheckList()))
				.reminderNoticeTime(form.getReminderNoticeTime())
				.reminderRepeat(form.getReminderRepeat())
				.todoStartDateTime(new YbmDate(form.getTodoStartDate() + " " + form.getTodoStartTime(), YbmDate.FmtPtn.HYPHEN_DATE_HOUR_MINUTES))
				.createUser(new YbmUser(new UserId(form.getCreateUserId()), new UserName(form.getCreateUserName())))
				.createDateTime(new YbmDate(form.getCreateDateTime(), YbmDate.FmtPtn.HYPHEN_DATE_TIMEML6))
				.updateUser(new YbmUser(new UserId(form.getUpdateUserId()), new UserName(form.getUpdateUserName())))
				.updateDateTime(new YbmDate(form.getUpdateDateTime(), YbmDate.FmtPtn.HYPHEN_DATE_TIMEML6))
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
	static public List<Todo> toDomain(List<TodoListForm> todoList){
		List<Todo> rtnList = new ArrayList<>();
		if(todoList == null) {
			return rtnList;
		}
		for(TodoListForm adapter : todoList) {
			rtnList.add(toDomain(adapter));
		}
		return rtnList;
	}

}
