package yabomu.trip.domain.model.todolist;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Iterator;
import java.util.List;
import java.util.ListIterator;

@SuppressWarnings({"rawtypes","unchecked"})
public class CheckList implements List<CheckItem>{

	private final List<CheckItem> checkList;
	private Long todoId;

	public CheckList () {
		this.checkList = new ArrayList<CheckItem>();
	}

	public CheckList (List<CheckItem> checkList) {
		this.checkList = new ArrayList<>(checkList);
	}

	public boolean isSameTodo(CheckItem e) {
		if(this.todoId != null && this.todoId != e.todoId()) {
			throw new IllegalArgumentException("複数のチェックリストの中に、違うTODOIDが挿入されています。" +
												"[追加先のtodoId=" + this.todoId +
												"チェックリストのtodoId=" + e.todoId() + "]");
		}
		return true;
	}
	public boolean isSameTodo(Collection<CheckItem> list) {
		for(CheckItem item : list) {
			if(isSameTodo(item)) {
				continue;
			}
		}
		return true;
	}

	@Override
	public int size() {
		return checkList.size();
	}

	@Override
	public boolean isEmpty() {
		return checkList.isEmpty();
	}

	@Override
	public boolean contains(Object o) {
		return checkList.contains(o);
	}

	@Override
	public Iterator<CheckItem> iterator() {
		return checkList.iterator();
	}

	@Override
	public Object[] toArray() {
		return checkList.toArray();
	}

	@Override
	public Object[] toArray(Object[] a) {
		return checkList.toArray(a);
	}

	@Override
	public boolean remove(Object o) {
		return checkList.remove(o);
	}

	@Override
	public boolean containsAll(Collection c) {
		return checkList.containsAll(c);
	}

	@Override
	public boolean addAll(Collection c) {
		if(isSameTodo(c)) {
			return checkList.addAll(c);
		}
		return false;
	}

	@Override
	public boolean addAll(int index, Collection c) {
		if(isSameTodo(c)) {
			return checkList.addAll(index, c);
		}
		return false;
	}
	@Override
	public boolean removeAll(Collection c) {
		return checkList.removeAll(c);
	}
	@Override
	public boolean retainAll(Collection c) {
		return checkList.retainAll(c);
	}

	@Override
	public void clear() {
		checkList.clear();
	}

	@Override
	public int indexOf(Object o) {
		return checkList.indexOf(o);
	}

	@Override
	public int lastIndexOf(Object o) {
		return checkList.lastIndexOf(o);
	}

	@Override
	public ListIterator<CheckItem> listIterator() {
		return checkList.listIterator();
	}

	@Override
	public ListIterator<CheckItem> listIterator(int index) {
		return checkList.listIterator(index);
	}

	@Override
	public List subList(int fromIndex, int toIndex) {
		return checkList.subList(fromIndex, toIndex);
	}

	@Override
	public boolean add(CheckItem e) {
		if(isSameTodo(e)) {
			return checkList.add(e);
		}
		return false;
	}

	@Override
	public CheckItem get(int index) {
		return checkList.get(index);
	}


	/**
	 * <pre>
	 * 指定されたindexの要素を、elementで置き換える
	 * 挿入されるTODOIDが各チェックリストのものと同じでければ、挿入されずに指定された要素をそのまま返す
	 * </pre>
	 * @exception IllegalArgumentException 指定された要素のTODOIDが、既存のチェックリストと異なる場合
	 */
	@Override
	public CheckItem set(int index, CheckItem element) {
		if(isSameTodo(element)) {
			return checkList.set(index, element);
		}
		return element;
	}

	@Override
	public void add(int index, CheckItem element) {
		if(isSameTodo(element)) {
			checkList.add(index, element);
		}
	}

	@Override
	public CheckItem remove(int index) {
		return checkList.remove(index);
	}


}
