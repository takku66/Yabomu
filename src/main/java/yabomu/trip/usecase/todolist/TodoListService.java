package yabomu.trip.usecase.todolist;

import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

import org.springframework.stereotype.Service;

import lombok.AllArgsConstructor;
import yabomu.trip.domain.model.todolist.CheckItem;
import yabomu.trip.domain.model.todolist.Todo;
import yabomu.trip.domain.model.todolist.TodoList;
import yabomu.trip.domain.repository.todolist.ICheckListRepository;
import yabomu.trip.domain.repository.todolist.ITodoListRepository;
import yabomu.trip.infrastructure.condition.CheckItemCondition;

/**
 * <pre>
 * TODOリストのサービス
 * </pre>
 * @version 1.0
 */
@Service
@AllArgsConstructor
public class TodoListService {

	final private ITodoListRepository todoListRepository;
	final private ICheckListRepository checkListRepository;

	public TodoList findAll(){
		TodoList todoList = new TodoList(todoListRepository.findAll());
		Map<Long, Todo> todoMap = new HashMap<>();
		Set<Long> todoIdSet = new HashSet<>();
		for(Todo todo : todoList) {
			todoMap.put(todo.todoId(), todo);
			todoIdSet.add(todo.todoId());
		}
		CheckItemCondition condition = new CheckItemCondition();
		List<CheckItem> checkList = checkListRepository.matching(condition);
		for(CheckItem item : checkList) {
			if(todoMap.containsKey(item.todoId())) {
				todoMap.get(item.todoId()).addCheckList(item);
			}
		}
		return todoList;
	}

	public TodoList save(Todo todo){
		return new TodoList(todoListRepository.findAll());
	}

}
