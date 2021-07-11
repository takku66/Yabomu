package yabomu.trip.infrastructure.PostgreSQL;

import java.util.List;

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
@Repository("notuse-todoListRepository")
@Mapper
public class TodoListRepository implements ITodoListRepository {

	@Override
	public List<Todo> findAll() {
		return null;
	}

}
