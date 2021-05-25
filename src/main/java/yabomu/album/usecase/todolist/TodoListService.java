package yabomu.album.usecase.todolist;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import yabomu.album.domain.model.todolist.Todo;
import yabomu.album.domain.repository.todolist.ITodoListRepository;

@Service
public class TodoListService {

	final private ITodoListRepository todoListRepository;

	@Autowired
	public TodoListService(ITodoListRepository todoListRepository) {
		this.todoListRepository = todoListRepository;
	}

	public List<Todo> findAll(){
		return todoListRepository.findAll();
	}

}
