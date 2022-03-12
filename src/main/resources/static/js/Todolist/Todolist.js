import { TodoElement } from "./TodoElement";
import { TODO } from "./TodoView";
export class Todolist {
    constructor(todoArea, cardTemplate) {
        this._todoArea = todoArea;
        this._cardTemplate = cardTemplate;
        this._list = document.getElementsByClassName("todo-box");
        this._map = new Map();
        for (let i = 0, ilen = this._list.length; i < ilen; i++) {
            let todoIdElm = this._list[i].getElementsByClassName("todo-id")[0];
            if (todoIdElm) {
                let todoId = todoIdElm.value;
                this._map.set(todoId, this._list[i]);
            }
        }
    }
    /**
     * @param todoId
     * @returns
     */
    contains(todoId) {
        if (!todoId)
            return false;
        return this._map.has(todoId);
    }
    // TODO: 他のテンプレートが入ってきた時に対応できない
    buildTodoCard(todoCard, todo) {
        const card = new TodoElement(todoCard);
        card.copyFrom(todo);
    }
    /**
     * 指定のTODOデータを元に、TODOリストに新しいTODOカードを追加する
     * @param todo 追加したいTODOデータ
     * @returns 新しく作成されたTODOカード
     */
    createTodoCard(todo) {
        // 新規のTODOを、引数のobjの情報を元に作成する
        const newCard = this._cardTemplate.cloneNode(true);
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
    updateTodoCard(todo) {
        // 既存のTODOを引数のオブジェクトのtodoIdを元に引っ張り出し、
        // 引数のtodoオブジェクトで上書きする。
        const updateCard = this._map.get(todo.todoId);
        this.buildTodoCard(updateCard, todo);
        if (TODO.mediator.isOpeningEditArea()) {
            TODO.mediator.copyEditTodo(updateCard);
        }
        return updateCard;
    }
    /**
     * TODOリストから指定のTODOカードを削除する
     * @param todo 削除対象のTODOデータ
     * @returns 削除されたTODOカード
     */
    deleteTodoCard(todo) {
        const deleteCard = this._map.get(todo.todoId);
        this._todoArea.removeChild(deleteCard);
        this._map.delete(todo.todoId);
        return deleteCard;
    }
    /**
     *
     * @returns TODO LIST
     */
    getTodolist() {
        return this._list;
    }
}
//# sourceMappingURL=Todolist.js.map