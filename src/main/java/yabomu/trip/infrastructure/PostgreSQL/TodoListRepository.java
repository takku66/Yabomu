package yabomu.trip.infrastructure.PostgreSQL;

import java.util.List;

import org.springframework.stereotype.Repository;

import yabomu.trip.domain.model.todolist.Todo;
import yabomu.trip.domain.repository.todolist.ITodoListRepository;

@Repository("notuse-todoListRepository")
public class TodoListRepository implements ITodoListRepository {

	@Override
	public List<Todo> findAll() {
		return null;
	}

}
