package yabomu.trip.domain.repository.todolist;

import java.util.List;

import org.springframework.stereotype.Repository;

import yabomu.trip.domain.model.todolist.CheckItem;
import yabomu.trip.domain.valueobject.TodoId;
import yabomu.trip.infrastructure.condition.CheckItemCondition;

/**
 * <pre>
 * チェックリストのリポジトリインターフェース
 * </pre>
 * @version 1.0
 */
@Repository
public interface ICheckListRepository {

	/**
	 * <pre>
	 * 指定されたTODOIDキーのチェックリストを取得する
	 * </pre>
	 * @return
	 */
	public List<CheckItem> findById(TodoId todoId);

	/**
	 * <pre>
	 * 条件付きでチェックリストを取得する
	 * </pre>
	 * @return
	 */
	public List<CheckItem> matching(CheckItemCondition param);

	/**
	 * <pre>
	 * チェックリストを登録する
	 * </pre>
	 * @return
	 */
	public int insert(CheckItem checkItem);

	/**
	 * <pre>
	 * チェックリストを更新する
	 * </pre>
	 * @return
	 */
	public int update(CheckItem checkItem);
}
