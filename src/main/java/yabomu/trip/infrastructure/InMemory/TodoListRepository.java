package yabomu.trip.infrastructure.InMemory;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.stream.Collectors;

import org.springframework.stereotype.Repository;

import yabomu.trip.domain.model.todolist.Todo;
import yabomu.trip.domain.model.todolist.TodoList;
import yabomu.trip.domain.model.todolist.TodoListFactory;
import yabomu.trip.domain.repository.todolist.ITodoListRepository;
import yabomu.trip.infrastructure.condition.TodoCondition;
import yabomu.trip.infrastructure.converter.TodoListEntityConverter;
import yabomu.trip.infrastructure.entity.TodoEntity;

/**
 * <pre>
 * TodoListオブジェクト用のリポジトリ
 * （InMemory用）
 * </pre>
 * @version 1.0
 */
@Repository("Test-TodoList")
public class TodoListRepository implements ITodoListRepository {

	private final Map<Long, TodoEntity> todoListData;

	public TodoListRepository () {
		// テスト用のダミーTODOリストを生成する
		List<Todo> todolist = TodoListFactory.createTodoListForTest();
		List<TodoEntity> todoListEntity = TodoListEntityConverter.toEntity(todolist);
		// nullチェックを通して、todoIdをキーとしたマップを生成する
		this.todoListData = todoListEntity.stream()
				.filter(Objects::nonNull)
				.collect(Collectors.toMap(TodoEntity::getTodoId, e -> e));
	}

	public TodoListRepository(Map<Long, TodoEntity> todoListData) {
		this.todoListData = new HashMap<>(todoListData);
	}


	@Override
	public TodoList findAll() {
		List<TodoEntity> todolist = todoListData.values().stream()
//									.sorted((e1, e2) -> e1.todoId().compareTo(e2.todoId()))
									.sorted(Comparator.comparing(TodoEntity::getTodoId))
									.collect(Collectors.toList());
		return TodoListEntityConverter.toDomain(todolist);
	}

	@Override
	public Todo findById(Long todoId) {
		return TodoListEntityConverter.toDomain(todoListData.get(todoId));
	}

	@Override
	public TodoList matching(TodoCondition param) {
		return TodoListEntityConverter.toDomain(new ArrayList<TodoEntity>());
	}

	public int insert(Todo todo) {
		return 0;
	}

	public int update(Todo todo) {
		return 0;
	}

}
