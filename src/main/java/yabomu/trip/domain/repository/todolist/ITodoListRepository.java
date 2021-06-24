package yabomu.trip.domain.repository.todolist;

import java.util.List;

import org.springframework.stereotype.Repository;

import yabomu.trip.domain.model.todolist.Todo;

@Repository
public interface ITodoListRepository {

	public List<Todo> findAll();
}
