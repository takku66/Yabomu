package yabomu.trip.infrastructure.InMemory;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.stream.Collectors;

import org.springframework.stereotype.Repository;

import yabomu.trip.domain.model.todolist.CheckItem;
import yabomu.trip.domain.model.todolist.Todo;
import yabomu.trip.domain.repository.todolist.ICheckListRepository;
import yabomu.trip.domain.valueobject.EventId;
import yabomu.trip.domain.valueobject.TodoId;
import yabomu.trip.infrastructure.condition.CheckItemCondition;
import yabomu.trip.infrastructure.converter.CheckItemEntityConverter;
import yabomu.trip.infrastructure.entity.CheckItemEntity;

/**
 * <pre>
 * チェックリスト用のリポジトリ
 * （InMemory用）
 * </pre>
 * @version 1.0
 */
@Repository("Test-CheckList")
public class CheckListRepository implements ICheckListRepository {

	private final Map<EventId, Map<TodoId, Map<Integer, CheckItemEntity>>> checkListData;
	private final Map<TodoId, Map<Integer, CheckItemEntity>> checkListTodoMap;


	public CheckListRepository() {
		this.checkListData = new HashMap<>();
		this.checkListTodoMap = new HashMap<>();
	}


	@Override
	public List<CheckItem> findByEventId(EventId eventId) {
		return (List<CheckItem>)checkListData.get(eventId).values().stream()	// Map<Integer, CheckItem>をstreamに流し
																	.map(e -> e.values())	// CheckItemだけを取り出し
																	.filter(e -> e instanceof CheckItemEntity)	// インスタンスの型チェックをし
																	.map(e -> CheckItemEntityConverter.toDomain((CheckItemEntity)e))	// 型キャストし
																	.toList();	// リストにして返す
	}

	@Override
	public List<CheckItem> findByTodoId(TodoId todoId) {
		Map<Integer, CheckItemEntity> checkListMap = checkListTodoMap.get(todoId);
		if(Objects.isNull(checkListMap)){
			return new ArrayList<CheckItem>();
		}
		return CheckItemEntityConverter.toDomain((List<CheckItemEntity>) checkListMap.values());
	}

	@Override
	public CheckItem findByTodoSeq(TodoId todoId, int seq) {
		Map<Integer, CheckItemEntity> checkListMap = checkListTodoMap.get(todoId);
		if(Objects.isNull(checkListMap)){
			return null;
		}
		CheckItemEntity entity = checkListMap.get(seq);
		if(Objects.isNull(entity)){
			return null;
		}
		return CheckItemEntityConverter.toDomain(entity);
	}


	@Override
	public List<CheckItem> matching(CheckItemCondition param) {
		return new ArrayList<CheckItem>();
	}

	@Override
	public int save(Todo todo) {
		List<CheckItem> repoCheckItem = findByTodoId(todo.todoId());
		Map<Integer, CheckItem> repoSeqSet = (Map<Integer, CheckItem>)repoCheckItem.stream().collect(Collectors.toMap(CheckItem::seq, e -> e));
		for(CheckItem wantSaveItem : todo.checkList()){
			if(repoSeqSet.containsKey(wantSaveItem.seq())){
				if(Objects.deepEquals(repoSeqSet.get(wantSaveItem.seq()), wantSaveItem)){
					return 0;
				}
				return update(CheckItemEntityConverter.toEntity(wantSaveItem));
			}else{
				return insert(CheckItemEntityConverter.toEntity(wantSaveItem));
			}
		}
		return 0;
	}

	@Override
	public int save(CheckItem checkItem) {
		return 0;
	}

	private int insert(CheckItemEntity entity){
		Map<Integer, CheckItemEntity> seqMap = new HashMap<>();
		seqMap.put(entity.getSeq(), entity);
		this.checkListTodoMap.put(new TodoId(entity.getTodoId()), seqMap);
		this.checkListData.put(new EventId(entity.getEventId()), this.checkListTodoMap);
		return 1;
	}
	private int update(CheckItemEntity entity){
		Map<Integer, CheckItemEntity> seqMap = new HashMap<>();
		seqMap.put(entity.getSeq(), entity);
		this.checkListTodoMap.replace(new TodoId(entity.getTodoId()), seqMap);
		this.checkListData.put(new EventId(entity.getEventId()), this.checkListTodoMap);
		return 1;
	}

}
