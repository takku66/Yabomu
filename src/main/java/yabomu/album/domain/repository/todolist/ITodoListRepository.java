package yabomu.album.domain.repository.todolist;

import java.util.List;

import org.springframework.stereotype.Repository;

import yabomu.album.domain.model.todolist.Todo;

@Repository
public interface ITodoListRepository {

	public List<Todo> findAll();
}
