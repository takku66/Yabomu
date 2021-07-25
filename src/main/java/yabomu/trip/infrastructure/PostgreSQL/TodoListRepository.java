package yabomu.trip.infrastructure.PostgreSQL;

import java.util.List;

import org.springframework.stereotype.Repository;

import lombok.RequiredArgsConstructor;
import yabomu.trip.domain.model.todolist.Todo;
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
	public List<Todo> findAll() {
		List<TodoEntity> todoEntityList = mapper.findAll();
		return TodoListEntityConverter.toDomainTodoList(todoEntityList);
	}

	@Override
	public Todo findById(String todoId) {
		TodoEntity todoEntity = mapper.findById(todoId);
		return TodoListEntityConverter.toDomainTodoList(todoEntity);
	}

	@Override
	public List<Todo> matching(TodoCondition param) {
		List<TodoEntity> todoEntityList = mapper.matching(param);
		return TodoListEntityConverter.toDomainTodoList(todoEntityList);
	}

}
