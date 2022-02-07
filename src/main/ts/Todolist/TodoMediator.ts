import { Messenger } from "../Messenger";
import { YbmWebSocket } from "../YbmWebSocket";
import { EditTodo, IEditTodoAdp } from "./EditTodo";
import { ITodoViewAdp, TodoView } from "./TodoView";

interface QuePublisherTodo {
	eventId: string;
	todoId: string;
}

export class TodoMediator implements ITodoViewAdp, IEditTodoAdp{

	_todoView: TodoView;
	_editTodo: EditTodo;

	_ws: YbmWebSocket;
	_msgr: Messenger;

	_quePublishTodo: Array<QuePublisherTodo>;

	constructor(todoView:TodoView, editTodo:EditTodo,
				ybmWebSocket: YbmWebSocket, messenger: Messenger){
		this._todoView = todoView;
		this._editTodo = editTodo;
		this._ws = ybmWebSocket;
		this._msgr = messenger;
		this._quePublishTodo = [];
	}
	public connectWebSocekt(){
		this._ws.connectWebSocket("/sub/todolist/eventId/save", this._todoView.receiveUpdatedTodo);
	}
	public openTodo(elm: Element | undefined){
		this._editTodo.setUpEditCard(elm);
		this._todoView.openTodo();
	}
	public closeTodo(){
		this._editTodo.clear();
		this._todoView.closeTodo();
	}
	public saveTodo(url: string, stringifiedJson: string){
		this._ws.send(url, stringifiedJson);
	}
	public quePublisherTodo(eventId:string, todoId: string){
		this._quePublishTodo.push({eventId, todoId});
	}
	public requestPublishTodo(){
		const publishTodo = this._quePublishTodo.pop();
		if(!publishTodo) return;
		if(!publishTodo.eventId || !publishTodo.todoId) return;
		this._ws.send(`/pub/todolist/${publishTodo.eventId}/${publishTodo.todoId}`, "");
	}
	public pushMessage(message: string, expireTime: number): void{
		this._msgr.pushMessage(message, expireTime);
	}
}
