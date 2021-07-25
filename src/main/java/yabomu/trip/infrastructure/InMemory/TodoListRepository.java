package yabomu.trip.infrastructure.InMemory;

import java.util.Comparator;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.stream.Collectors;

import org.springframework.stereotype.Repository;

import yabomu.trip.domain.model.todolist.Todo;
import yabomu.trip.domain.model.todolist.TodoListFactory;
import yabomu.trip.domain.repository.todolist.ITodoListRepository;
import yabomu.trip.infrastructure.condition.TodoCondition;

/**
 * <pre>
 * TodoListオブジェクト用のリポジトリ
 * （InMemory用）
 * </pre>
 * @version 1.0
 */
@Repository("notuse-todoListRepository")
public class TodoListRepository implements ITodoListRepository {

	private final Map<String, Todo> todoListData;

	public TodoListRepository () {
		// テスト用のダミーTODOリストを生成する
		List<Todo> todolist = TodoListFactory.createTodoListForTest();
		// nullチェックを通して、todoIdをキーとしたマップを生成する
		this.todoListData = todolist.stream()
				.filter(Objects::nonNull)
				.collect(Collectors.toMap(Todo::todoId, e -> e));
	}


	@Override
	public List<Todo> findAll() {
		return todoListData.values().stream()
//									.sorted((e1, e2) -> e1.todoId().compareTo(e2.todoId()))
									.sorted(Comparator.comparing(Todo::todoId))
									.collect(Collectors.toList());
	}

	@Override
	public Todo findById(String todoId) {
		return todoListData.get(todoId);
	}

	@Override
	public List<Todo> matching(TodoCondition param) {
		return null;
	}

}
