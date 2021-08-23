package yabomu.trip.infrastructure.converter;

import java.util.ArrayList;
import java.util.List;

import yabomu.trip.domain.model.todolist.CheckItem;
import yabomu.trip.domain.valueobject.UserId;
import yabomu.trip.domain.valueobject.YbmDate;
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
				.eventId(Long.valueOf(checkItemEntity.getEventId()))
				.todoId(Long.valueOf(checkItemEntity.getTodoId()))
				.seq(checkItemEntity.getSeq())
				.content(checkItemEntity.getContent())
				.completed(toBoolStatus(checkItemEntity.getCompleted()))
				.createUserId(new UserId(checkItemEntity.getCreateUserId()))
				.createDateTime(new YbmDate(checkItemEntity.getCreateDateTime(), YbmDate.FmtPtn.HYPHEN_DATE))
				.updateUserId(new UserId(checkItemEntity.getUpdateUserId()))
				.updateDateTime(new YbmDate(checkItemEntity.getUpdateDateTime(), YbmDate.FmtPtn.HYPHEN_DATE))
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

	//TODO:オブジェクト指向的には、チェックリストのステータスクラスを値オブジェクトとして持つべきか
	/**
	 * <pre>
	 * チェックリストのステータスを、文字列から真偽値に変換する
	 * </pre>
	 * @param status
	 * @return
	 */
	static private boolean toBoolStatus(String status) {
		final List<String> completedList = new ArrayList<>() {
			{add("t");add("true");add("y");add("yes");add("1");}
		};
		return completedList.contains(status);
	}
	static private String toStringStatus(boolean status) {
		if(status) {
			return "t";
		}else {
			return "f";
		}
	}

}
