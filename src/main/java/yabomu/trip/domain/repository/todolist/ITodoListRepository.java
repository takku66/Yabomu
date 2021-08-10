package yabomu.trip.domain.repository.todolist;

import java.util.List;

import org.springframework.stereotype.Repository;

import yabomu.trip.domain.model.todolist.Todo;
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
	public List<Todo> findAll();

	/**
	 * <pre>
	 * 指定されたキーのTODOリストを取得する
	 * </pre>
	 * @return
	 */
	public Todo findById(Long todoId);

	/**
	 * <pre>
	 * 条件付きでTODOリストを取得する
	 * </pre>
	 * @return
	 */
	public List<Todo> matching(TodoCondition param);
}
