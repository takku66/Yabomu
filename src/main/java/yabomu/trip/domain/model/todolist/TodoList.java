package yabomu.trip.domain.model.todolist;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Iterator;
import java.util.List;
import java.util.ListIterator;

@SuppressWarnings({"rawtypes","unchecked"})
public class TodoList implements List<Todo>{

	private final List<Todo> todoList;

	public TodoList () {
		this.todoList = new ArrayList<Todo>();
	}

	public TodoList (List<Todo> todoList) {
		this.todoList = new ArrayList<>(todoList);
	}


	@Override
	public int size() {
		return todoList.size();
	}

	@Override
	public boolean isEmpty() {
		return todoList.isEmpty();
	}

	@Override
	public boolean contains(Object o) {
		return todoList.contains(o);
	}

	@Override
	public Iterator<Todo> iterator() {
		return todoList.iterator();
	}

	@Override
	public Object[] toArray() {
		return todoList.toArray();
	}

	@Override
	public Object[] toArray(Object[] a) {
		return todoList.toArray(a);
	}

	@Override
	public boolean remove(Object o) {
		return todoList.remove(o);
	}

	@Override
	public boolean containsAll(Collection c) {
		return todoList.containsAll(c);
	}

	@Override
	public boolean addAll(Collection c) {
		return todoList.addAll(c);
	}

	@Override
	public boolean addAll(int index, Collection c) {
		return todoList.addAll(index, c);
	}

	@Override
	public boolean removeAll(Collection c) {
		return todoList.removeAll(c);
	}

	@Override
	public boolean retainAll(Collection c) {
		return todoList.retainAll(c);
	}

	@Override
	public void clear() {
		todoList.clear();
	}

	@Override
	public int indexOf(Object o) {
		return todoList.indexOf(o);
	}

	@Override
	public int lastIndexOf(Object o) {
		return todoList.lastIndexOf(o);
	}

	@Override
	public ListIterator<Todo> listIterator() {
		return todoList.listIterator();
	}

	@Override
	public ListIterator<Todo> listIterator(int index) {
		return todoList.listIterator(index);
	}

	@Override
	public List subList(int fromIndex, int toIndex) {
		return todoList.subList(fromIndex, toIndex);
	}

	@Override
	public boolean add(Todo e) {
		return todoList.add(e);
	}

	@Override
	public Todo get(int index) {
		return todoList.get(index);
	}

	@Override
	public Todo set(int index, Todo element) {
		return todoList.set(index, element);
	}

	@Override
	public void add(int index, Todo element) {
		todoList.add(index, element);
	}

	@Override
	public Todo remove(int index) {
		return todoList.remove(index);
	}


}
