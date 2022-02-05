package yabomu.trip.infrastructure.InMemory;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;

import org.springframework.stereotype.Repository;

import yabomu.trip.domain.model.todolist.Todo;
import yabomu.trip.domain.model.todolist.TodoList;
import yabomu.trip.domain.model.todolist.TodoListFactory;
import yabomu.trip.domain.repository.todolist.ITodoListRepository;
import yabomu.trip.domain.valueobject.EventId;
import yabomu.trip.domain.valueobject.TodoId;
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

	private final Map<EventId, Map<TodoId, TodoEntity>> eventListData;
	private final Map<TodoId, TodoEntity> todoListData;

	public TodoListRepository () {
		// テスト用のダミーTODOリストを生成する
		TodoList todolist = TodoListFactory.createTodoListForTest();
		List<TodoEntity> todoListEntity = TodoListEntityConverter.toEntity(todolist);
		this.eventListData = new HashMap<>();
		this.todoListData = new HashMap<>();

		for(TodoEntity entity : todoListEntity){
			if(entity == null) continue;
			this.todoListData.put(new TodoId(entity.getTodoId()), entity);
			Map<TodoId, TodoEntity> todolistMap;
			if(this.eventListData.containsKey(new EventId(entity.getEventId()))){
				todolistMap = this.eventListData.get(new EventId(entity.getEventId()));
				todolistMap.put(new TodoId(entity.getTodoId()), entity);
			}else{
				todolistMap = new HashMap<>();
				todolistMap.put(new TodoId(entity.getTodoId()), entity);
				eventListData.put(new EventId(entity.getEventId()), todolistMap);
			}
		}

		// nullチェックを通して、eventIdをキーとしたマップを生成する
		// todolistMap = todoListEntity.stream()
		// 		.filter(Objects::nonNull)
		// 		.collect(Collectors.toMap(TodoEntity::getTodoId, e -> e));
	}

	public TodoListRepository(Map<EventId, Map<TodoId, TodoEntity>> eventListData,
								Map<TodoId, TodoEntity> todoListData) {
		this.eventListData = new HashMap<>(eventListData);
		this.todoListData = new HashMap<>(todoListData);
	}


	@Override
	public TodoList findAll() {
		List<Map<TodoId,TodoEntity>> maplist = new ArrayList<>(eventListData.values());
		TodoList todolist = new TodoList();
		for(Map<TodoId, TodoEntity> map : maplist){
			todolist.addAll(TodoListEntityConverter.toDomain(new ArrayList<>(map.values())));
		}
// 		List<TodoEntity> todolist = list.stream().
// //									.sorted((e1, e2) -> e1.todoId().compareTo(e2.todoId()))
// 									.sorted(Comparator.comparing(TodoEntity::getTodoId))
// 									.collect(Collectors.toList());
		return todolist;
	}

	@Override
	public TodoList findByEventId(EventId eventId) {
		Map<TodoId, TodoEntity> todoMap = this.eventListData.get(eventId);
		if(Objects.isNull(todoMap)){ return new TodoList(); }
		return TodoListEntityConverter.toDomain(new ArrayList<>(todoMap.values()));
	}

	@Override
	public Todo findByTodoId(TodoId todoId) {
		return TodoListEntityConverter.toDomain(this.todoListData.get(todoId));
	}

	@Override
	public TodoList matching(TodoCondition param) {
		return new TodoList();
	}

	@Override
	public int save(Todo todo) {
		Todo repoTodo = findByTodoId(todo.todoId());
		if(repoTodo == null){
			Map<TodoId, TodoEntity> todomap = eventListData.get(todo.eventId());
			todomap.put(todo.todoId(), TodoListEntityConverter.toEntity(todo));
			return 1;
		}else{
			todoListData.replace(todo.todoId(), TodoListEntityConverter.toEntity(todo));
			return 1;
		}
	}

}
