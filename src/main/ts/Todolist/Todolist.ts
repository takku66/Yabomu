import { ITodoData } from "./ITodoData";
import { TODO } from "./TodoView";

export class Todolist {

    _todoArea: HTMLElement;
    _cardTemplate: HTMLElement;
    _list: HTMLCollection;
    _map: Map<string, Element>;

	constructor(todoArea: HTMLElement, cardTemplate: HTMLElement){
		this._todoArea = todoArea;
		this._cardTemplate = cardTemplate;

		this._list = document.getElementsByClassName("todo-box");
		this._map = new Map();
		for(let i = 0, ilen = this._list.length; i < ilen; i++){
            let todoIdElm: HTMLInputElement = <HTMLInputElement>this._list[i].getElementsByClassName("todo-id")[0];
            if(todoIdElm){
                let todoId = todoIdElm.value;
                this._map.set(todoId, this._list[i]);
            }
		}
	}
	public contains(todoId: string): boolean{
		if(!todoId) return false;
		return this._map.has(todoId);
	}

	public reflectTodo(todoCard: HTMLElement, todo: ITodoData){
		(<HTMLInputElement>todoCard.getElementsByClassName("event-id")[0]).value = todo.eventId;
		(<HTMLInputElement>todoCard.getElementsByClassName("todo-id")[0]).value = todo.todoId;
		(<HTMLInputElement>todoCard.getElementsByClassName("text title")[0]).value = todo.title;
		(<HTMLElement>todoCard.getElementsByClassName("label title")[0]).innerText = todo.title;
		(<HTMLInputElement>todoCard.getElementsByClassName("text content")[0]).value = todo.content;
		(<HTMLElement>todoCard.getElementsByClassName("label content")[0]).innerText = todo.content;
		(<HTMLInputElement>todoCard.getElementsByClassName("select reminder-notice-time")[0]).value = todo.reminderNoticeTime;
		(<HTMLInputElement>todoCard.getElementsByClassName("select reminder-repeat")[0]).value = todo.reminderRepeat;
		(<HTMLInputElement>todoCard.getElementsByClassName("text todo-start-date")[0]).value = todo.todoStartDate;
		(<HTMLInputElement>todoCard.getElementsByClassName("text todo-start-time")[0]).value = todo.todoStartTime;
		(<HTMLInputElement>todoCard.getElementsByClassName("hid todo-create-user-id")[0]).value = todo.createUserId;
		(<HTMLInputElement>todoCard.getElementsByClassName("hid todo-create-user-name")[0]).value = todo.createUserName;
		(<HTMLInputElement>todoCard.getElementsByClassName("hid todo-create-datetime")[0]).value = todo.createDatetime;
		(<HTMLInputElement>todoCard.getElementsByClassName("hid todo-update-user-id")[0]).value = todo.updateUserId;
		(<HTMLInputElement>todoCard.getElementsByClassName("hid todo-update-user-name")[0]).value = todo.updateUserName;
		(<HTMLInputElement>todoCard.getElementsByClassName("hid todo-update-datetime")[0]).value = todo.updateDatetime;
		
		const checklistArea = <HTMLInputElement>document.querySelector<HTMLInputElement>("#checklist-area ul.checklist");
		const checklist = todoCard.querySelectorAll("ul.checklist li");
		for(let checkItem of checklist){
			checklistArea.appendChild(checkItem.cloneNode(true));
		}
	}

	public createTodoCard(todo: ITodoData): HTMLElement{
		// 新規のTODOを、引数のobjの情報を元に作成する
		const newCard:HTMLElement = <HTMLElement>this._cardTemplate.cloneNode(true);
		this.reflectTodo(newCard, todo);
		this._todoArea.appendChild(newCard);
        return newCard;
	}
	public updateTodoCard(todo: ITodoData): HTMLElement{
		// 既存のTODOを引数のオブジェクトのtodoIdを元に引っ張り出し、
		// 引数のtodoオブジェクトで上書きする。
		const updateCard:HTMLElement = <HTMLElement>this._map.get(todo.todoId);
		this.reflectTodo(updateCard, todo);
		if(TODO.mediator.isEditing()){ TODO.mediator.copyEditTodo(updateCard); }
		return updateCard;
	}
	public getTodolist():HTMLCollection{
		return this._list;
	}

}

class TodoCard {

}
