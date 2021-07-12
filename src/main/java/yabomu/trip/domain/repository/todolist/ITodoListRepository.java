package yabomu.trip.domain.repository.todolist;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import yabomu.trip.domain.model.todolist.Todo;

@Repository
public interface ITodoListRepository {
	/**
	 * <pre>
	 * 全てのTODOリストを取得する
	 * </pre>
	 * @return
	 */
	public List<Todo> findAll();

	/**
	 * <pre>
	 * 指定されたキーのTODOリストを取得する
	 * </pre>
	 * @return
	 */
	public Todo findById(String todoId);

	/**
	 * <pre>
	 * 条件付きでTODOリストを取得する
	 * </pre>
	 * @return
	 */
	public List<Todo> matching(Map<String, Object> param);
}
