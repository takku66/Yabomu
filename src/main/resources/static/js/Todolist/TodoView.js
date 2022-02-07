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
    }
}
export class TodoView {
    constructor() {
        this._todoArea = document.getElementById("todolist-container");
        this._btnOpenNewTodo = document.getElementById("btn-open-new-todo");
        this._editTodoArea = document.getElementById("edit-todo-area");
        this._filter = document.getElementById("edit-todo-filter");
        this._todolist = new Todolist(this._todoArea, this.createTodoCardTemplate());
        this.addEventOpenNewTodo();
        this.addEventOpenEditTodo();
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
    // ----- TODOのオープン/クローズ
    openTodo() {
        this._filter.classList.add("active");
        this._editTodoArea.classList.add("active");
    }
    closeTodo() {
        this._filter.classList.remove("active");
        this._editTodoArea.classList.remove("active");
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
    receiveUpdatedTodo(data) {
    }
    stopClickPropagation(elm) {
        if (!elm) {
            return false;
        }
        elm.addEventListener("click", function (e) {
            e.stopPropagation();
        }, false);
    }
}
//# sourceMappingURL=TodoView.js.map