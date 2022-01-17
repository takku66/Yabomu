export class Todolist {

    _todoArea: HTMLElement;
    _cardTemplate: HTMLElement;
    _list: HTMLCollection;
    _map: Map<string, Element>;

	constructor(todoArea: HTMLElement, cardTemplate: HTMLElement){
		this._todoArea = todoArea;
		this._cardTemplate = cardTemplate;

		this._list = document.getElementsByClassName(".todo-box");
		this._map = new Map();
		for(let i = 0, ilen = this._list.length; i < ilen; i++){
            let todoIdElm: HTMLInputElement = <HTMLInputElement>this._list[i].querySelector(".todo-id");
            if(todoIdElm){
                let todoId = todoIdElm.value;
                this._map.set(todoId, this._list[i]);
            }
		}
	}

	public createTodoCard(todoId:string, obj:Map<string, string>){
		// 新規のTODOを、引数のobjの情報を元に作成する
		const newCard:HTMLElement = <HTMLElement>this._cardTemplate.cloneNode(true);
		
		// newCard.getElementsByClassName();
        this._map.set(todoId, newCard);
	}
	public updateTodoCard(todoId:string, obj:Map<string, string>){

	}
	public getTodolist():HTMLCollection{
		return this._list;
	}

}
