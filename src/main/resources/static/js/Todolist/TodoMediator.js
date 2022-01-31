export class TodoMediator {
    constructor(todoView, editTodo, ybmWebSocket, messenger) {
        this._todoView = todoView;
        this._editTodo = editTodo;
        this._ws = ybmWebSocket;
        this._msgr = messenger;
    }
    connectWebSocekt() {
        this._ws.connectWebSocket("/sub/todolist/eventId/save", this._todoView.receiveUpdatedTodo);
    }
    openTodo(elm) {
        this._editTodo.setUp(elm);
        this._todoView.openTodo();
    }
    closeTodo() {
        this._editTodo.clear();
        this._todoView.closeTodo();
    }
    saveTodo(url, stringifiedJson) {
        this._ws.send(url, stringifiedJson);
    }
    pushMessage(message, expireTime) {
        this._msgr.pushMessage(message, expireTime);
    }
}
//# sourceMappingURL=TodoMediator.js.map