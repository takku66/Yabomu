package yabomu.album.infrastructure.PostgreSQL;

import java.util.List;

import org.springframework.stereotype.Repository;

import yabomu.album.domain.model.todolist.Todo;
import yabomu.album.domain.repository.todolist.ITodoListRepository;

@Repository("notuse-todoListRepository")
public class TodoListRepository implements ITodoListRepository {

	@Override
	public List<Todo> findAll() {
		return null;
	}

}
