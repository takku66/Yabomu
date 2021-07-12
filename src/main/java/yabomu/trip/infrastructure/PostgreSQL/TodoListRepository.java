package yabomu.trip.infrastructure.PostgreSQL;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import yabomu.trip.domain.model.todolist.Todo;
import yabomu.trip.domain.repository.todolist.ITodoListRepository;

/**
 * <pre>
 * TodoListオブジェクト用のリポジトリ
 * （Repository用）
 * </pre>
 * @version 1.0
 */
@Mapper
@Repository("notuse-todoListRepository")
public class TodoListRepository implements ITodoListRepository {

	@Override
	public List<Todo> findAll() {
		return null;
	}

	@Override
	public Todo findById(String todoId) {
		// TODO 自動生成されたメソッド・スタブ
		return null;
	}

	@Override
	public List<Todo> matching(Map<String, Object> param) {
		// TODO 自動生成されたメソッド・スタブ
		return null;
	}

}
