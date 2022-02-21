import { Messenger } from "../Messenger";
import { YbmWebSocket } from "../YbmWebSocket";
import { EditTodo, IEditTodoAdp } from "./EditTodo";
import { ITodoData } from "./ITodoData";
import { ITodoViewAdp, TodoView } from "./TodoView";

interface QueuePublisherTodo {
	eventId: string;
	todoId: string;
}

export class TodoMediator implements ITodoViewAdp, IEditTodoAdp{

	_todoView: TodoView;
	_editTodo: EditTodo;

	_ws: YbmWebSocket;
	_msgr: Messenger;

	_queuePublishTodo: Array<QueuePublisherTodo>;

	constructor(todoView:TodoView, editTodo:EditTodo,
				ybmWebSocket: YbmWebSocket, messenger: Messenger){
		this._todoView = todoView;
		this._editTodo = editTodo;
		this._ws = ybmWebSocket;
		this._msgr = messenger;
		this._queuePublishTodo = [];
	}

	public connectWebSocket(eventId: string){
		// コールバック関数をそのまま渡してしまうと、関数内のthisの参照がundefinedになってしまう
		// アロー関数を使って、静的にthisを決定させる。
		this._ws.connectWebSocket(`/sub/todolist/${eventId}`, (data: any) => {
			this._todoView.receiveUpdatedTodo(data);
		});
		
	}
	public disconnectWebSocket(){
		this._ws.disconnectWebSocket();
	}
	public openTodo(elm: Element | undefined){
		this._editTodo.setUpEditCard(elm);
		this._todoView.openTodo();
	}
	public closeTodo(){
		this._editTodo.clear();
		this._todoView.closeTodo();
	}
	public isEditing(){
		return this._todoView.isEditing();
	}
	public copyEditTodo(elm: Element){
		this._editTodo.copyToEditCard(elm);
	}
	public saveTodo(url: string, stringifiedJson: string){
		this._ws.send(url, stringifiedJson);
	}

	public queuePublisherTodo(eventId:string, todoId: string){
		this._queuePublishTodo.push({eventId, todoId});
	}
	public requestPublishTodo(){
		const publishTodo = this._queuePublishTodo.pop();
		if(!publishTodo) return;
		if(!publishTodo.eventId || !publishTodo.todoId) return;
		this._ws.send(`/pub/todolist/${publishTodo.eventId}/${publishTodo.todoId}/publish`, "");
	}
	public pushMessage(message: string, expireTime: number): void{
		this._msgr.pushMessage(message, expireTime);
	}
}
