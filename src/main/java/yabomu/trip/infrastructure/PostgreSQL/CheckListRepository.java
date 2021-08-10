package yabomu.trip.infrastructure.PostgreSQL;

import java.util.List;

import org.springframework.stereotype.Repository;

import lombok.RequiredArgsConstructor;
import yabomu.trip.domain.model.todolist.CheckItem;
import yabomu.trip.domain.repository.todolist.ICheckListRepository;
import yabomu.trip.infrastructure.condition.CheckItemCondition;
import yabomu.trip.infrastructure.converter.CheckItemEntityConverter;
import yabomu.trip.infrastructure.entity.CheckItemEntity;
import yabomu.trip.infrastructure.mapper.CheckListMapper;

/**
 * <pre>
 * TodoListオブジェクト用のリポジトリ
 * （Repository用）
 * </pre>
 * @version 1.0
 */
@Repository("checkListRepository")
@RequiredArgsConstructor
public class CheckListRepository implements ICheckListRepository {

	private final CheckListMapper mapper;

	@Override
	public List<CheckItem> findById(Long todoId) {
		List<CheckItemEntity> checkItemEntityList = mapper.findById(todoId);
		return CheckItemEntityConverter.toDomain(checkItemEntityList);
	}

	@Override
	public List<CheckItem> matching(CheckItemCondition param) {
		List<CheckItemEntity> checkItemEntityList = mapper.matching(param);
		return CheckItemEntityConverter.toDomain(checkItemEntityList);
	}

}
