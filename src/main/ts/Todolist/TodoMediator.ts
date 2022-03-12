import { Messenger } from "../Messenger";
import { YbmWebSocket } from "../YbmWebSocket";
import { EditTodo, IEditTodoAdp } from "./EditTodo";
import { ITodoData } from "./ITodoData";
import { TodoElement } from "./TodoElement";
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

	/**
	 * イベントIDごとのWebSocketコネクションを接続する
	 * データ受け取り後は、{@link TodoView.receiveUpdatedTodo} を実行する
	 * @param eventId - TODOの親キーであるイベントID
	 */
	public connectWebSocket(eventId: string){
		// MYNOTE:コールバック関数をそのまま渡してしまうと、関数内のthisの参照がundefinedになってしまう
		// アロー関数を使って、静的にthisを決定させる。
		this._ws.connectWebSocket(`/sub/todolist/${eventId}`, (data: any) => {
			this._todoView.receiveUpdatedTodo(data);
		});
		
	}
	/**
	 * WebSocket通信を切断する
	 */
	public disconnectWebSocket(){
		this._ws.disconnectWebSocket();
	}
	/**
	 * 編集用のTODOエリアを開く
	 * @param elm - 編集したいTODO | 指定がなければ、新規のTODOエリア
	 */
	public openTodo(elm: Element | undefined){
		this._editTodo.setUpEditCard(elm);
		this._todoView.openTodo();
	}
	public closeTodo(){
		this._editTodo.clear();
		this._todoView.closeTodo();
	}
	public isOpeningEditArea(){
		return this._todoView.isOpeningEditArea();
	}
	/**
	 * 編集用のTODOエリアに、指定のTODO要素の値をコピーする
	 * @param elm - 値を反映したいTODO要素
	 */
	public copyEditTodo(elm: Element){
		this._editTodo.copyToEditCard(elm);
	}
	public saveTodo(url: string, stringifiedJson: string){
		this._ws.send(url, stringifiedJson);
	}

	public queuePublisherTodo(eventId:string, todoId: string){
		this._queuePublishTodo.push({eventId, todoId});
	}
	public requestPublishTodoFromQueue(){
		const publishTodo = this._queuePublishTodo.pop();
		if(!publishTodo) {
			throw new Error("キューから値の取得に失敗");
		}
		const pubEventId = publishTodo.eventId;
		const pubTodoId = publishTodo.todoId;
		if(!pubEventId || !pubTodoId){
			throw new Error("キューから値の取得に失敗");
		}
		this._ws.send(`/pub/todolist/${pubEventId}/${pubTodoId}/publish`, "");
	}
	public requestPublishTodo(eventId: string, todoId: string){
		if(!eventId || !todoId){ 
			throw new Error("値の不明なEventId, TodoId");
		}
		this._ws.send(`/pub/todolist/${eventId}/${todoId}/publish`, "");
	}
	public requestPublishDeleteTodo(eventId: string, todoId: string){
		if(!eventId || !todoId){ 
			throw new Error("値の不明なEventId, TodoId");
		}
		this._ws.send(`/pub/todolist/${eventId}/${todoId}/publish/delete`, "");
	}

	public pushMessage(message: string, expireTime: number): void{
		this._msgr.pushMessage(message, expireTime);
	}
}
