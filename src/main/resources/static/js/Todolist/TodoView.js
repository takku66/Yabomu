import { Messenger } from "../Messenger";
import { YbmWebSocket } from "../YbmWebSocket";
import { EditTodo } from "./EditTodo";
import { Todolist } from "./Todolist";
import { TodoMediator } from "./TodoMediator";
/**
 *DOM要素が読み込み完了だったらOKな処理
 */
window.addEventListener("DOMContentLoaded", function () {
    new TODO();
}, false);
export class TODO {
    constructor() {
        const todoView = new TodoView();
        const editTodo = new EditTodo();
        // eventIdの文字列部分は、いづれ画面から取得したい
        const webSocket = new YbmWebSocket("/ws-stomp");
        const messenger = new Messenger();
        TODO.mediator = new TodoMediator(todoView, editTodo, webSocket, messenger);
        const eventIdElm = document.getElementById("choose-event");
        if (eventIdElm.value) {
            TODO.mediator.connectWebSocket(eventIdElm.value);
        }
        else {
            throw new Error(`イベントIDが取得できないため、STOMP通信を開始できません。[eventId: ${eventIdElm.value}]`);
        }
    }
}
export class TodoView {
    constructor() {
        this._todoArea = document.getElementById("todolist-container");
        this._btnOpenNewTodo = document.getElementById("btn-open-new-todo");
        this._editTodoArea = document.getElementById("edit-todo-area");
        this._filter = document.getElementById("edit-todo-filter");
        this._editing = false;
        this._todolist = new Todolist(this._todoArea, this.createTodoCardTemplate());
        this.addEventOpenNewTodo();
        this.addEventOpenEditTodo();
        this.addEventChangeEvent();
        this.stopPropagation();
    }
    // ----- TODO画面のTODOカードのテンプレート
    createTodoCardTemplate() {
        const elm = document.createElement("div");
        return elm;
    }
    // ----- 新規TODO作成 周りのイベントを定義
    addEventOpenNewTodo() {
        this._btnOpenNewTodo.addEventListener("click", () => {
            TODO.mediator.openTodo(undefined);
        }, false);
    }
    // ----- TODO更新 周りのイベントを定義
    addEventOpenEditTodo() {
        for (let elm of this._todolist.getTodolist()) {
            elm.addEventListener("click", () => {
                TODO.mediator.openTodo(elm);
            }, false);
        }
    }
    // ----- イベントの変更を検知
    addEventChangeEvent() {
        const selectEventIdElm = document.getElementById("choose-event");
        selectEventIdElm.addEventListener("change", function () {
            TODO.mediator.disconnectWebSocket();
            TODO.mediator.connectWebSocket(this.value);
            // TODO 今のTodolist情報を、そのイベントように洗替する処理
        }, false);
    }
    // ----- TODOのオープン/クローズ
    openTodo() {
        this._filter.classList.add("active");
        this._editTodoArea.classList.add("active");
        this._editing = true;
    }
    closeTodo() {
        this._filter.classList.remove("active");
        this._editTodoArea.classList.remove("active");
        this._editing = false;
    }
    // ----- イベント制御
    stopPropagation() {
        let stopSelectors = [".todo-box .select.reminder-notice-time",
            ".todo-box .select.reminder-repeat",
            ".todo-box .checklist li",
            ".btn-save-todolist",
            ".todo-box .todo-controle"];
        const stopElmArys = stopSelectors.map(selector => {
            return Array.from(document.querySelectorAll(selector));
        });
        const stopElms = stopElmArys.flat();
        for (let elm of stopElms) {
            this.stopClickPropagation(elm);
        }
    }
    // TODO anyはやめたい
    receiveUpdatedTodo(data) {
        console.log("web socket成功");
        console.log(data);
        const todo = JSON.parse(data.body);
        if (this._todolist.contains(todo.todoId)) {
            this._todolist.updateTodoCard(todo);
        }
        else {
            this._todolist.createTodoCard(todo);
        }
    }
    stopClickPropagation(elm) {
        if (!elm) {
            return false;
        }
        elm.addEventListener("click", function (e) {
            e.stopPropagation();
        }, false);
    }
    isEditing() {
        return this._editing;
    }
}
//# sourceMappingURL=TodoView.js.map