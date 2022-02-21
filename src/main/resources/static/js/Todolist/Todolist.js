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
    contains(todoId) {
        if (!todoId)
            return false;
        return this._map.has(todoId);
    }
    reflectTodo(todoCard, todo) {
        todoCard.getElementsByClassName("event-id")[0].value = todo.eventId;
        todoCard.getElementsByClassName("todo-id")[0].value = todo.todoId;
        todoCard.getElementsByClassName("text title")[0].value = todo.title;
        todoCard.getElementsByClassName("label title")[0].innerText = todo.title;
        todoCard.getElementsByClassName("text content")[0].value = todo.content;
        todoCard.getElementsByClassName("label content")[0].innerText = todo.content;
        todoCard.getElementsByClassName("select reminder-notice-time")[0].value = todo.reminderNoticeTime;
        todoCard.getElementsByClassName("select reminder-repeat")[0].value = todo.reminderRepeat;
        todoCard.getElementsByClassName("text todo-start-date")[0].value = todo.todoStartDate;
        todoCard.getElementsByClassName("text todo-start-time")[0].value = todo.todoStartTime;
        todoCard.getElementsByClassName("hid todo-create-user-id")[0].value = todo.createUserId;
        todoCard.getElementsByClassName("hid todo-create-user-name")[0].value = todo.createUserName;
        todoCard.getElementsByClassName("hid todo-create-datetime")[0].value = todo.createDatetime;
        todoCard.getElementsByClassName("hid todo-update-user-id")[0].value = todo.updateUserId;
        todoCard.getElementsByClassName("hid todo-update-user-name")[0].value = todo.updateUserName;
        todoCard.getElementsByClassName("hid todo-update-datetime")[0].value = todo.updateDatetime;
        const checklistArea = document.querySelector("#checklist-area ul.checklist");
        const checklist = todoCard.querySelectorAll("ul.checklist li");
        for (let checkItem of checklist) {
            checklistArea.appendChild(checkItem.cloneNode(true));
        }
    }
    createTodoCard(todo) {
        // 新規のTODOを、引数のobjの情報を元に作成する
        const newCard = this._cardTemplate.cloneNode(true);
        this.reflectTodo(newCard, todo);
        this._todoArea.appendChild(newCard);
        return newCard;
    }
    updateTodoCard(todo) {
        // 既存のTODOを引数のオブジェクトのtodoIdを元に引っ張り出し、
        // 引数のtodoオブジェクトで上書きする。
        const updateCard = this._map.get(todo.todoId);
        this.reflectTodo(updateCard, todo);
        if (TODO.mediator.isEditing()) {
            TODO.mediator.copyEditTodo(updateCard);
        }
        return updateCard;
    }
    getTodolist() {
        return this._list;
    }
}
class TodoCard {
}
//# sourceMappingURL=Todolist.js.map