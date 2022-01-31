package yabomu.trip.infrastructure.converter;

import java.util.ArrayList;
import java.util.List;

import yabomu.trip.domain.model.todolist.Todo;
import yabomu.trip.domain.model.todolist.TodoList;
import yabomu.trip.domain.model.user.YbmUser;
import yabomu.trip.domain.valueobject.EventId;
import yabomu.trip.domain.valueobject.ReminderNoticeTime;
import yabomu.trip.domain.valueobject.ReminderRepeat;
import yabomu.trip.domain.valueobject.TodoId;
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
				.eventId(new EventId(todoEntity.getEventId()))
				.todoId(new TodoId(todoEntity.getTodoId()))
				.title(todoEntity.getTitle())
				.content(todoEntity.getContent())
				.checkList(CheckItemEntityConverter.toDomain(todoEntity.getCheckList()))
				.reminderNoticeTime(ReminderNoticeTime.selectBy(todoEntity.getReminderNoticeTime()))
				.reminderRepeat(ReminderRepeat.selectBy(todoEntity.getReminderRepeat()))
				.createUser(new YbmUser(new UserId(todoEntity.getCreateUserId()), new UserName(todoEntity.getCreateUserName())))
				.createDateTime(new YbmDate(todoEntity.getCreateDateTime()))
				.updateUser(new YbmUser(new UserId(todoEntity.getUpdateUserId()), new UserName(todoEntity.getUpdateUserName())))
				.updateDateTime(new YbmDate(todoEntity.getUpdateDateTime()))
				.todoStartDateTime(new YbmDate(todoEntity.getTodoStartDateTime()))
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

	/**
	 * <pre>
	 * Domain用のオブジェクトに変換します
	 * </pre>
	 * @param todo
	 * @return TodoEntity
	 */
	static public TodoEntity toEntity(Todo todo){
		if(todo == null) {
			return null;
		}
		TodoEntity entity = new TodoEntity();
		entity.setEventId(todo.eventId().value());
		entity.setTodoId(todo.todoId().value());
		entity.setCreateUserId(todo.createUser().id());
		entity.setCreateUserName(todo.createUserName());
		entity.setUpdateUserId(todo.updateUser().id());
		entity.setUpdateUserName(todo.updateUserName());
		entity.setCreateDateTime(todo.createDateTime());
		entity.setUpdateDateTime(todo.updateDateTime());
		entity.setTitle(todo.title());
		entity.setContent(todo.content());
		entity.setCheckList(CheckItemEntityConverter.toEntity(todo.checkList()));
		entity.setTodoStartDateTime(todo.todoStartDateTime());
		entity.setTodoEndDateTime(todo.todoEndDateTime());
		entity.setReminderNoticeTime(todo.reminderNoticeTime().getCode());
		entity.setReminderRepeat(todo.reminderRepeat().getCode());
		return entity;
	}
	/**
	 * <pre>
	 * Entity用のオブジェクトに変換します
	 * </pre>
	 * @param todoList
	 * @return List<TodoEntity>
	 */
	static public List<TodoEntity> toEntity(List<Todo> todoList){
		List<TodoEntity> rtnList = new ArrayList<>();
		if(todoList == null) {
			return rtnList;
		}
		for(Todo todo : todoList) {
			rtnList.add(toEntity(todo));
		}
		return rtnList;
	}
}
