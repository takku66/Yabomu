package yabomu.trip.infrastructure.PostgreSQL;

import java.util.List;

import org.springframework.stereotype.Repository;

import lombok.RequiredArgsConstructor;
import yabomu.trip.domain.model.todolist.Todo;
import yabomu.trip.domain.model.todolist.TodoList;
import yabomu.trip.domain.repository.todolist.ITodoListRepository;
import yabomu.trip.domain.valueobject.EventId;
import yabomu.trip.domain.valueobject.TodoId;
import yabomu.trip.infrastructure.condition.TodoCondition;
import yabomu.trip.infrastructure.converter.TodoListEntityConverter;
import yabomu.trip.infrastructure.entity.TodoEntity;
import yabomu.trip.infrastructure.mapper.TodoListMapper;

/**
 * <pre>
 * TodoListオブジェクト用のリポジトリ
 * （Repository用）
 * </pre>
 * @version 1.0
 */
@Repository
@RequiredArgsConstructor
public class TodoListRepository implements ITodoListRepository {

	private final TodoListMapper mapper;

	@Override
	public TodoList findAll() {
		List<TodoEntity> todoEntityList = mapper.findAll();
		return TodoListEntityConverter.toDomain(todoEntityList);
	}

	@Override
	public TodoList findByEventId(EventId eventId) {
		List<TodoEntity> todoEntityList = mapper.findByEventId(eventId);
		return TodoListEntityConverter.toDomain(todoEntityList);
	}

	@Override
	public Todo findByTodoId(TodoId todoId) {
		TodoEntity todoEntity = mapper.findByTodoId(todoId);
		return TodoListEntityConverter.toDomain(todoEntity);
	}

	@Override
	public TodoList matching(TodoCondition param) {
		List<TodoEntity> todoEntityList = mapper.matching(param);
		return TodoListEntityConverter.toDomain(todoEntityList);
	}

	@Override
	public int save(Todo todo) {
		Todo repoTodo = findByTodoId(todo.todoId());
		if(repoTodo == null){
			return mapper.insert(TodoListEntityConverter.toEntity(todo));
		}else{
			return mapper.update(TodoListEntityConverter.toEntity(todo));
		}
	}

}
