import { Messenger } from "../Messenger";
import { YbmWebSocket } from "../YbmWebSocket";
import { EditTodo, IEditTodoAdp } from "./EditTodo";
import { ITodoViewAdp, TodoView } from "./TodoView";

export class TodoMediator implements ITodoViewAdp, IEditTodoAdp{

	_todoView: TodoView;
	_editTodo: EditTodo;

	_ws: YbmWebSocket;
	_msgr: Messenger;

	constructor(todoView:TodoView, editTodo:EditTodo,
				ybmWebSocket: YbmWebSocket, messenger: Messenger){
		this._todoView = todoView;
		this._editTodo = editTodo;
		this._ws = ybmWebSocket;
		this._msgr = messenger;
	}

	public openTodo(elm: Element){
		this._editTodo.setUp(elm);
		this._todoView.openTodo();
	}
	public closeTodo(){
		this._editTodo.clear();
		this._todoView.closeTodo();
	}
	public saveTodo(url: string, json: string){

	}

}
