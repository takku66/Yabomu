package yabomu.trip.infrastructure.InMemory;

import java.util.List;

import org.springframework.stereotype.Repository;

import yabomu.trip.domain.factory.todolist.TodoListFactory;
import yabomu.trip.domain.model.todolist.Todo;
import yabomu.trip.domain.repository.todolist.ITodoListRepository;

/**
 * <pre>
 * TodoListオブジェクト用のリポジトリ
 * </pre>
 * @author takku66
 * @version 1.0
 */
@Repository("todoListRepository")
public class TodoListRepository implements ITodoListRepository {

	@Override
	public List<Todo> findAll() {
		return TodoListFactory.createTodoListForTest();
	}

}
