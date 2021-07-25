package yabomu.trip.infrastructure.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import yabomu.trip.infrastructure.condition.TodoCondition;
import yabomu.trip.infrastructure.entity.TodoEntity;

/**
 * <pre>
 * TodoListテーブルのmapper
 * </pre>
 * @version 1.0
 */
@Mapper
public interface TodoListMapper {

	public List<TodoEntity> findAll();

	public TodoEntity findById(String todoId);

	public List<TodoEntity> matching(TodoCondition param);

}
