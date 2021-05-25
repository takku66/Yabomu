package yabomu.album.infrastructure.InMemory;

import java.util.List;

import org.springframework.stereotype.Repository;

import yabomu.album.domain.factory.todolist.TodoListFactory;
import yabomu.album.domain.model.todolist.Todo;
import yabomu.album.domain.repository.todolist.ITodoListRepository;

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
