package yabomu.trip.infrastructure.converter;

import java.util.List;

import yabomu.trip.domain.model.todolist.Todo;
import yabomu.trip.domain.model.todolist.TodoList;
import yabomu.trip.domain.model.user.YbmUser;
import yabomu.trip.domain.valueobject.ReminderRepeat;
import yabomu.trip.domain.valueobject.ReminderTime;
import yabomu.trip.domain.valueobject.UserId;
import yabomu.trip.domain.valueobject.UserName;
import yabomu.trip.domain.valueobject.YbmDate;
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
	static public Todo toDomain(TodoEntity todoEntity){
		if(todoEntity == null) {
			return null;
		}
		Todo todo = Todo.builder()
				.eventId(todoEntity.getEventId())
				.todoId(todoEntity.getTodoId())
				.title(todoEntity.getTitle())
				.content(todoEntity.getContent())
				.checkList(CheckItemEntityConverter.toDomain(todoEntity.getCheckList()))
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
	static public TodoList toDomain(List<TodoEntity> todoList){
		TodoList rtnList = new TodoList();
		if(todoList == null) {
			return rtnList;
		}
		for(TodoEntity entity : todoList) {
			rtnList.add(toDomain(entity));
		}
		return rtnList;
	}
}
