package yabomu.trip.infrastructure.PostgreSQL;

import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.stream.Collectors;

import org.springframework.stereotype.Repository;

import lombok.RequiredArgsConstructor;
import yabomu.trip.domain.model.todolist.CheckItem;
import yabomu.trip.domain.model.todolist.Todo;
import yabomu.trip.domain.repository.todolist.ICheckListRepository;
import yabomu.trip.domain.valueobject.EventId;
import yabomu.trip.domain.valueobject.TodoId;
import yabomu.trip.infrastructure.condition.CheckItemCondition;
import yabomu.trip.infrastructure.converter.CheckItemEntityConverter;
import yabomu.trip.infrastructure.converter.TodoListEntityConverter;
import yabomu.trip.infrastructure.entity.CheckItemEntity;
import yabomu.trip.infrastructure.mapper.CheckListMapper;

/**
 * <pre>
 * TodoListオブジェクト用のリポジトリ
 * （Repository用）
 * </pre>
 * @version 1.0
 */
@Repository
@RequiredArgsConstructor
public class CheckListRepository implements ICheckListRepository {

	private final CheckListMapper mapper;

	@Override
	public List<CheckItem> findByEventId(EventId eventId) {
		List<CheckItemEntity> checkItemEntityList = mapper.findByEventId(eventId);
		return CheckItemEntityConverter.toDomain(checkItemEntityList);
	}

	@Override
	public List<CheckItem> findByTodoId(TodoId todoId) {
		List<CheckItemEntity> checkItemEntityList = mapper.findByTodoId(todoId);
		return CheckItemEntityConverter.toDomain(checkItemEntityList);
	}

	@Override
	public CheckItem findByTodoSeq(TodoId todoId, int seq) {
		CheckItemEntity checkItemEntity = mapper.findByTodoSeq(todoId, seq);
		return CheckItemEntityConverter.toDomain(checkItemEntity);
	}

	@Override
	public List<CheckItem> matching(CheckItemCondition param) {
		List<CheckItemEntity> checkItemEntityList = mapper.matching(param);
		return CheckItemEntityConverter.toDomain(checkItemEntityList);
	}

	
	@Override
	public int save(Todo todo) {
		int sum = 0;
		List<CheckItem> repoCheckItem = findByTodoId(todo.todoId());
		Map<Integer, CheckItem> repoSeqMap = (Map<Integer, CheckItem>)repoCheckItem.stream().collect(Collectors.toMap(CheckItem::seq, e -> e));
		for(CheckItem wantSaveItem : todo.checkList()){
			if(repoSeqMap.containsKey(wantSaveItem.seq())){
				if(wantSaveItem.deepEquals(repoSeqMap.get(wantSaveItem.seq()))){
					continue;
				}
				repoSeqMap.remove(wantSaveItem.seq());
				sum += mapper.update(CheckItemEntityConverter.toEntity(wantSaveItem));
			}else{
				sum += mapper.insert(CheckItemEntityConverter.toEntity(wantSaveItem));
			}
		}
		// update対象にならなかったものは、削除する
		for(Entry<Integer, CheckItem> entry : repoSeqMap.entrySet()){
			mapper.delete(CheckItemEntityConverter.toEntity(entry.getValue()));
		}
		return sum;
	}
	
	@Override
	public int save(CheckItem checkItem) {

		CheckItem repoCheckItem = findByTodoSeq(checkItem.todoId(), checkItem.seq());
		if(repoCheckItem == null){
			return mapper.insert(CheckItemEntityConverter.toEntity(checkItem));
		}else{
			return mapper.update(CheckItemEntityConverter.toEntity(checkItem));
		}

	}

	@Override
	public int delete(CheckItem checkItem) {
		return mapper.delete(CheckItemEntityConverter.toEntity(checkItem));
	}

	@Override
	public int delete(Todo todo) {
		return mapper.deleteAllCheckItem(TodoListEntityConverter.toEntity(todo));
	}

}
