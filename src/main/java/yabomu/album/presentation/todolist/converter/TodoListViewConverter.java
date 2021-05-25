package yabomu.album.presentation.todolist.converter;

import java.util.ArrayList;
import java.util.List;

import yabomu.album.domain.model.todolist.CheckItem;
import yabomu.album.domain.model.todolist.Todo;
import yabomu.album.presentation.todolist.viewadapter.CheckItemViewAdapter;
import yabomu.album.presentation.todolist.viewadapter.TodoListViewAdapter;

public class TodoListViewConverter {

	private TodoListViewConverter() {
	}

	static public List<TodoListViewAdapter> convert(List<Todo> todoList) {
		List<TodoListViewAdapter> rtnList = new ArrayList<>();
		for(Todo todo : todoList) {
			TodoListViewAdapter adapter = new TodoListViewAdapter();
			adapter.setTodoId(todo.todoId());
			adapter.setTitle(todo.title());
			adapter.setContent(todo.content());
			adapter.setCheckList(convertCheckList(todo.checkList()));
			adapter.setReminderTime(todo.reminderTime());
			adapter.setReminderRepeat(todo.reminderRepeat());
			adapter.setScheduledStartDateTime(todo.scheduledStartDateTime());
			adapter.setCreateUserName(todo.createUserName());
			adapter.setCreateDateTime(todo.createDateTime());
			adapter.setUpdateUserName(todo.updateUserName());
			adapter.setUpdateDateTime(todo.updateDateTime());
			rtnList.add(adapter);
		}
		return rtnList;
	}

	static public List<CheckItemViewAdapter> convertCheckList(List<CheckItem> checkList) {
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

}
