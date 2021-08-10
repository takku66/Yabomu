package yabomu.trip.infrastructure.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

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


	public List<CheckItemEntity> findById(Long todoId);

	public List<CheckItemEntity> matching(CheckItemCondition param);

}
