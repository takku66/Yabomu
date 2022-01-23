export class Todolist {
    constructor(todoArea, cardTemplate) {
        this._todoArea = todoArea;
        this._cardTemplate = cardTemplate;
        this._list = document.getElementsByClassName("todo-box");
        this._map = new Map();
        for (let i = 0, ilen = this._list.length; i < ilen; i++) {
            let todoIdElm = this._list[i].querySelector(".todo-id");
            if (todoIdElm) {
                let todoId = todoIdElm.value;
                this._map.set(todoId, this._list[i]);
            }
        }
    }
    createTodoCard(todoId, obj) {
        // 新規のTODOを、引数のobjの情報を元に作成する
        const newCard = this._cardTemplate.cloneNode(true);
        // newCard.getElementsByClassName();
        this._map.set(todoId, newCard);
    }
    updateTodoCard(todoId, obj) {
    }
    getTodolist() {
        return this._list;
    }
}
//# sourceMappingURL=Todolist.js.map