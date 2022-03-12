import { ITodoData } from "./ITodoData";
import { TodoElement } from "./TodoElement";
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
	/**
	 * @param todoId 
	 * @returns 
	 */
	public contains(todoId: string): boolean{
		if(!todoId) return false;
		return this._map.has(todoId);
	}

	// TODO: 他のテンプレートが入ってきた時に対応できない
	public buildTodoCard(todoCard: HTMLElement, todo: ITodoData){
		const card = new TodoElement(todoCard);
		card.copyFrom(todo);
	}

	/**
	 * 指定のTODOデータを元に、TODOリストに新しいTODOカードを追加する
	 * @param todo 追加したいTODOデータ
	 * @returns 新しく作成されたTODOカード
	 */
	public createTodoCard(todo: ITodoData): HTMLElement{
		// 新規のTODOを、引数のobjの情報を元に作成する
		const newCard:HTMLElement = <HTMLElement>this._cardTemplate.cloneNode(true);
		this.buildTodoCard(newCard, todo);
		this._todoArea.appendChild(newCard);
		this._map.set(todo.todoId, newCard);
        return newCard;
	}
	/**
	 * 指定のTODOデータを元に、TODOリスト内の情報を更新する
	 * @param todo 更新したいTODOデータ
	 * @returns 更新後のTODOカード
	 */
	public updateTodoCard(todo: ITodoData): HTMLElement{
		// 既存のTODOを引数のオブジェクトのtodoIdを元に引っ張り出し、
		// 引数のtodoオブジェクトで上書きする。
		const updateCard:HTMLElement = <HTMLElement>this._map.get(todo.todoId);
		this.buildTodoCard(updateCard, todo);
		if(TODO.mediator.isOpeningEditArea()){ TODO.mediator.copyEditTodo(updateCard); }
		return updateCard;
	}
	/**
	 * TODOリストから指定のTODOカードを削除する
	 * @param todo 削除対象のTODOデータ
	 * @returns 削除されたTODOカード
	 */
	public deleteTodoCard(todo: ITodoData){
		const deleteCard:HTMLElement = <HTMLElement>this._map.get(todo.todoId);
		this._todoArea.removeChild(deleteCard);
		this._map.delete(todo.todoId);
        return deleteCard;
	}
	/**
	 * 
	 * @returns TODO LIST
	 */
	public getTodolist():HTMLCollection{
		return this._list;
	}

}

