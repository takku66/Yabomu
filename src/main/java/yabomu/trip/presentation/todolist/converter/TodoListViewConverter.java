package yabomu.trip.presentation.todolist.converter;

import java.util.ArrayList;
import java.util.List;

import yabomu.trip.domain.model.todolist.CheckItem;
import yabomu.trip.domain.model.todolist.Todo;
import yabomu.trip.domain.model.user.YbmUser;
import yabomu.trip.domain.valueobject.UserId;
import yabomu.trip.domain.valueobject.UserName;
import yabomu.trip.domain.valueobject.YbmDate;
import yabomu.trip.presentation.todolist.viewadapter.CheckItemViewAdapter;
import yabomu.trip.presentation.todolist.viewadapter.TodoListViewAdapter;

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
	 * @return
	 */
	static public TodoListViewAdapter toViewTodoList(Todo todo) {
		TodoListViewAdapter adapter = new TodoListViewAdapter();
		adapter.setTodoId(todo.todoId());
		adapter.setTitle(todo.title());
		adapter.setContent(todo.content());
		adapter.setCheckList(toViewCheckList(todo.checkList()));
		adapter.setReminderTime(todo.reminderTime());
		adapter.setReminderRepeat(todo.reminderRepeat());
		adapter.setScheduledStartDateTime(todo.scheduledStartDateTime());
		adapter.setCreateUserId(todo.createUser().id());
		adapter.setCreateUserName(todo.createUserName());
		adapter.setCreateDateTime(todo.createDateTime());
		adapter.setUpdateUserId(todo.updateUser().id());
		adapter.setUpdateUserName(todo.updateUserName());
		adapter.setUpdateDateTime(todo.updateDateTime());
		return adapter;
	}
	/**
	 * <pre>
	 * View用のオブジェクトに変換します
	 * </pre>
	 * @param todoList
	 * @return
	 */
	static public List<TodoListViewAdapter> toViewTodoList(List<Todo> todoList) {
		List<TodoListViewAdapter> rtnList = new ArrayList<>();
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
	 * @return
	 */
	static public List<CheckItemViewAdapter> toViewCheckList(List<CheckItem> checkList) {
		List<CheckItemViewAdapter> checkListAdapter = new ArrayList<>();
		for(CheckItem checkItem : checkList) {
			CheckItemViewAdapter checkItemViewAdapter = new CheckItemViewAdapter();
			checkItemViewAdapter.setCheckListId(checkItem.checkListId());
			checkItemViewAdapter.setContent(checkItem.content());
			checkItemViewAdapter.setCompleted(checkItem.isCompleted());
			checkListAdapter.add(checkItemViewAdapter);
		}
		return checkListAdapter;
	}
	/**
	 * <pre>
	 * Domain用のオブジェクトに変換します
	 * </pre>
	 * @param adapter
	 * @return
	 */
	static public Todo toDomainTodoList(TodoListViewAdapter adapter){
		Todo todo = Todo.builder()
				.todoId(adapter.getTodoId())
				.title(adapter.getTitle())
				.content(adapter.getContent())
				.checkList(toDomainCheckList(adapter.getCheckList()))
				.reminderTime(adapter.getReminderTime())
				.reminderRepeat(adapter.getReminderRepeat())
				.createUser(new YbmUser(new UserId(adapter.getCreateUserId()), new UserName(adapter.getCreateUserName())))
				.createDateTime(new YbmDate(adapter.getCreateDateTime(), YbmDate.FmtPtn.HYPHEN_DATE))
				.updateUser(new YbmUser(new UserId(adapter.getUpdateUserId()), new UserName(adapter.getUpdateUserName())))
				.updateDateTime(new YbmDate(adapter.getUpdateDateTime(), YbmDate.FmtPtn.HYPHEN_DATE))
				.scheduledStartDateTime(new YbmDate(adapter.getScheduledStartDateTime(), YbmDate.FmtPtn.HYPHEN_DATE))
				.build();
		return todo;
	}
	/**
	 * <pre>
	 * Domain用のオブジェクトに変換します
	 * </pre>
	 * @param todoList
	 * @return
	 */
	static public List<Todo> toDomainTodoList(List<TodoListViewAdapter> todoList){
		List<Todo> rtnList = new ArrayList<>();
		for(TodoListViewAdapter adapter : todoList) {
			rtnList.add(toDomainTodoList(adapter));
		}
		return rtnList;
	}
	/**
	 * <pre>
	 * Domain用のオブジェクトに変換します
	 * </pre>
	 * @param checkListAdapter
	 * @return
	 */
	static public List<CheckItem> toDomainCheckList(List<CheckItemViewAdapter> checkListAdapter) {
		List<CheckItem> checkList = new ArrayList<>();
		for(CheckItemViewAdapter checkItemAdapter : checkListAdapter) {
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
