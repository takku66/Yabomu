package yabomu.trip.domain.repository.todolist;

import org.springframework.stereotype.Repository;

import yabomu.trip.domain.model.todolist.Todo;
import yabomu.trip.domain.model.todolist.TodoList;
import yabomu.trip.domain.valueobject.EventId;
import yabomu.trip.domain.valueobject.TodoId;
import yabomu.trip.infrastructure.condition.TodoCondition;

/**
 * <pre>
 * TODOリストのリポジトリインターフェース
 * </pre>
 * @version 1.0
 */
@Repository
public interface ITodoListRepository {

	/**
	 * <pre>
	 * 全てのTODOリストを取得する
	 * </pre>
	 * @return List<Todo> todoList
	 */
	public TodoList findAll();

	/**
	 * <pre>
	 * 指定されたイベントの全TODOリストを取得する
	 * </pre>
	 * @return
	 */
	public TodoList findByEventId(EventId eventId);

	/**
	 * <pre>
	 * 指定されたキーのTODOデータを取得する
	 * </pre>
	 * @return
	 */
	public Todo findByTodoId(TodoId todoId);

	/**
	 * <pre>
	 * 条件付きでTODOリストを取得する
	 * </pre>
	 * @return
	 */
	public TodoList matching(TodoCondition param);

	/**
	 * <pre>
	 * TODOデータを保存する
	 * </pre>
	 * @return
	 */
	public int save(Todo todo);

	/**
	 * <pre>
	 * TODOデータを削除する
	 * </pre>
	 * @param todo
	 * @return
	 */
	public int delete(Todo todo);

}
