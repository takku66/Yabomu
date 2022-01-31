package yabomu.trip.infrastructure.InMemory;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import yabomu.trip.domain.model.todolist.CheckItem;
import yabomu.trip.domain.repository.todolist.ICheckListRepository;
import yabomu.trip.domain.valueobject.EventId;
import yabomu.trip.domain.valueobject.TodoId;
import yabomu.trip.infrastructure.condition.CheckItemCondition;
import yabomu.trip.shared.YbmIdGenerator;

/**
 * <pre>
 * チェックリスト用のリポジトリ
 * （InMemory用）
 * </pre>
 * @version 1.0
 */
@Repository("Test-CheckList")
public class CheckListRepository implements ICheckListRepository {

	private final Map<TodoId, CheckItem> checkListData;

	@Autowired
	YbmIdGenerator idGenerator;

	public CheckListRepository() {
		this.checkListData = new HashMap<>();

		for(int i = 0; i < 10; i++) {
			EventId eventId = new EventId();
			TodoId todoId = new TodoId();
			for(int j = 0; j < i; j++) {
				checkListData.put(todoId,
						CheckItem.builder()
						.eventId(eventId)
						.todoId(todoId)
						.seq(j)
						.content("チェックリスト内容"+j)
						.completed(j/2==0)
						.build()
						);
			}
		}

	}

	@Override
	public List<CheckItem> findById(TodoId todoId) {
		return (List<CheckItem>) checkListData.values();
	}

	@Override
	public List<CheckItem> matching(CheckItemCondition param) {
		return new ArrayList<CheckItem>();
	}
	@Override
	public int insert(CheckItem checkItem) {
		return 0;
	}
	@Override
	public int update(CheckItem checkItem) {
		return 0;
	}

}
