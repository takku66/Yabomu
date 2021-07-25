package yabomu.trip.infrastructure.converter;

import java.util.ArrayList;
import java.util.List;

import yabomu.trip.domain.model.todolist.CheckItem;
import yabomu.trip.domain.model.todolist.Todo;
import yabomu.trip.domain.model.user.YbmUser;
import yabomu.trip.domain.valueobject.ReminderRepeat;
import yabomu.trip.domain.valueobject.ReminderTime;
import yabomu.trip.domain.valueobject.UserId;
import yabomu.trip.domain.valueobject.UserName;
import yabomu.trip.domain.valueobject.YbmDate;
import yabomu.trip.infrastructure.entity.CheckItemEntity;
import yabomu.trip.infrastructure.entity.TodoEntity;

public class TodoListEntityConverter {
	private TodoListEntityConverter() {
	}
	/**
	 * <pre>
	 * Domain用のオブジェクトに変換します
	 * </pre>
	 * @param todoEntity
	 * @return Todo
	 */
	static public Todo toDomainTodoList(TodoEntity todoEntity){
		if(todoEntity == null) {
			return null;
		}
		Todo todo = Todo.builder()
				.todoId(todoEntity.getTodoId())
				.title(todoEntity.getTitle())
				.content(todoEntity.getContent())
				.checkList(toDomainCheckList(todoEntity.getCheckList()))
				.reminderTime(ReminderTime.selectBy(todoEntity.getReminderTime()))
				.reminderRepeat(ReminderRepeat.selectBy(todoEntity.getReminderRepeat()))
				.createUser(new YbmUser(new UserId(todoEntity.getCreateUserId()), new UserName(todoEntity.getCreateUserName())))
				.createDateTime(new YbmDate(todoEntity.getCreateAt(), YbmDate.FmtPtn.HYPHEN_DATE))
				.updateUser(new YbmUser(new UserId(todoEntity.getUpdateUserId()), new UserName(todoEntity.getUpdateUserName())))
				.updateDateTime(new YbmDate(todoEntity.getUpdateAt(), YbmDate.FmtPtn.HYPHEN_DATE))
				.todoStartDateTime(new YbmDate(todoEntity.getTodoStartDateTime(), YbmDate.FmtPtn.HYPHEN_DATE))
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
	static public List<Todo> toDomainTodoList(List<TodoEntity> todoList){
		List<Todo> rtnList = new ArrayList<>();
		if(todoList == null) {
			return rtnList;
		}
		for(TodoEntity entity : todoList) {
			rtnList.add(toDomainTodoList(entity));
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
	static public List<CheckItem> toDomainCheckList(List<CheckItemEntity> checkListEntity) {
		List<CheckItem> checkList = new ArrayList<>();
		if(checkListEntity == null) {
			return checkList;
		}
		for(CheckItemEntity checkItemEntity : checkListEntity) {
			CheckItem checkItem = CheckItem.builder()
											.checkListId(checkItemEntity.getCheckListId())
											.content(checkItemEntity.getContent())
											.completed(checkItemEntity.isCompleted())
											.build();
			checkList.add(checkItem);
		}
		return checkList;
	}
}
