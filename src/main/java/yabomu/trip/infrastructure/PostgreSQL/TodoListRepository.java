package yabomu.trip.infrastructure.PostgreSQL;

import java.util.List;

import org.springframework.stereotype.Repository;

import lombok.RequiredArgsConstructor;
import yabomu.trip.domain.model.todolist.Todo;
import yabomu.trip.domain.model.todolist.TodoList;
import yabomu.trip.domain.repository.todolist.ITodoListRepository;
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
@Repository("todoListRepository")
@RequiredArgsConstructor
public class TodoListRepository implements ITodoListRepository {

	private final TodoListMapper mapper;

	@Override
	public TodoList findAll() {
		List<TodoEntity> todoEntityList = mapper.findAll();
		return TodoListEntityConverter.toDomain(todoEntityList);
	}

	@Override
	public Todo findById(Long todoId) {
		TodoEntity todoEntity = mapper.findById(todoId);
		return TodoListEntityConverter.toDomain(todoEntity);
	}

	@Override
	public TodoList matching(TodoCondition param) {
		List<TodoEntity> todoEntityList = mapper.matching(param);
		return TodoListEntityConverter.toDomain(todoEntityList);
	}

}
