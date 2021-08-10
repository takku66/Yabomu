package yabomu.trip.infrastructure.converter;

import java.util.ArrayList;
import java.util.List;

import yabomu.trip.domain.model.todolist.CheckItem;
import yabomu.trip.infrastructure.entity.CheckItemEntity;

public class CheckItemEntityConverter {
	private CheckItemEntityConverter() {
	}
	/**
	 * <pre>
	 * Domain用のオブジェクトに変換します
	 * </pre>
	 * @param checkItemEntity
	 * @return Todo
	 */
	static public CheckItem toDomain(CheckItemEntity checkItemEntity){
		if(checkItemEntity == null) {
			return null;
		}
		CheckItem checkItem = CheckItem.builder()
				.todoId(Long.valueOf(checkItemEntity.getTodoId()))
				.seq(checkItemEntity.getSeq())
				.content(checkItemEntity.getContent())
				.build();
		return checkItem;
	}
	/**
	 * <pre>
	 * Domain用のオブジェクトに変換します
	 * </pre>
	 * @param checkItemList
	 * @return List<CheckItem>
	 */
	static public List<CheckItem> toDomain(List<CheckItemEntity> checkItemList){
		List<CheckItem> rtnList = new ArrayList<>();
		if(checkItemList == null) {
			return rtnList;
		}
		for(CheckItemEntity entity : checkItemList) {
			rtnList.add(toDomain(entity));
		}
		return rtnList;
	}
}
