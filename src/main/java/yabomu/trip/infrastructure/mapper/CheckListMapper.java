package yabomu.trip.infrastructure.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import yabomu.trip.domain.valueobject.EventId;
import yabomu.trip.domain.valueobject.TodoId;
import yabomu.trip.infrastructure.condition.CheckItemCondition;
import yabomu.trip.infrastructure.entity.CheckItemEntity;

/**
 * <pre>
 * チェックリストテーブルのmapper
 * </pre>
 * @version 1.0
 */
@Mapper
public interface CheckListMapper {

	public List<CheckItemEntity> findByEventId(EventId eventId);

	public List<CheckItemEntity> findByTodoId(TodoId todoId);

	public CheckItemEntity findByTodoSeq(TodoId todoId, int seq);

	public List<CheckItemEntity> matching(CheckItemCondition param);

	public int insert(CheckItemEntity entity);

	public int update(CheckItemEntity entity);

	public int delete(CheckItemEntity entity);
}
