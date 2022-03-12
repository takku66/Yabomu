package yabomu.trip.domain.repository.todolist;

import java.util.List;

import org.springframework.stereotype.Repository;

import yabomu.trip.domain.model.todolist.CheckItem;
import yabomu.trip.domain.model.todolist.Todo;
import yabomu.trip.domain.valueobject.EventId;
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
	 * 指定されたEventIDキーのチェックリストを取得する
	 * </pre>
	 * @return
	 */
	public List<CheckItem> findByEventId(EventId eventId);

	/**
	 * <pre>
	 * 指定されたTODOIDキーのチェックリストを取得する
	 * </pre>
	 * @return
	 */
	public List<CheckItem> findByTodoId(TodoId todoId);

	/**
	 * <pre>
	 * 指定されたTodoIDと連番でチェックリストを取得する
	 * </pre>
	 */
	public CheckItem findByTodoSeq(TodoId todoId, int seq);

	/**
	 * <pre>
	 * 条件付きでチェックリストを取得する
	 * </pre>
	 * @return
	 */
	public List<CheckItem> matching(CheckItemCondition param);


	/**
	 * <pre>
	 * 指定されたTODOに紐づくチェックリストを全て保存する
	 * </pre>
	 * @return
	 */
	public int save(Todo todo);

	/**
	 * <pre>
	 * 指定されたチェック項目のみを保存する
	 * </pre>
	 * @return
	 */
	public int save(CheckItem checkItem);

	/**
	 * <pre>
	 * 指定されたTODOに紐づくチェックリストを全て削除する
	 * </pre>
	 * @return
	 */
	public int delete(Todo todo);

	
	/**
	 * <pre>
	 * 指定されたチェック項目のみを削除する
	 * </pre>
	 * @return
	 */
	public int delete(CheckItem checkItem);

}
