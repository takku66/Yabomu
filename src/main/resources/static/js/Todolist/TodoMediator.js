export class TodoMediator {
    constructor(todoView, editTodo, ybmWebSocket, messenger) {
        this._todoView = todoView;
        this._editTodo = editTodo;
        this._ws = ybmWebSocket;
        this._msgr = messenger;
        this._queuePublishTodo = [];
    }
    connectWebSocket(eventId) {
        // コールバック関数をそのまま渡してしまうと、関数内のthisの参照がundefinedになってしまう
        // アロー関数を使って、静的にthisを決定させる。
        this._ws.connectWebSocket(`/sub/todolist/${eventId}`, (data) => {
            this._todoView.receiveUpdatedTodo(data);
        });
    }
    disconnectWebSocket() {
        this._ws.disconnectWebSocket();
    }
    openTodo(elm) {
        this._editTodo.setUpEditCard(elm);
        this._todoView.openTodo();
    }
    closeTodo() {
        this._editTodo.clear();
        this._todoView.closeTodo();
    }
    isEditing() {
        return this._todoView.isEditing();
    }
    copyEditTodo(elm) {
        this._editTodo.copyToEditCard(elm);
    }
    saveTodo(url, stringifiedJson) {
        this._ws.send(url, stringifiedJson);
    }
    queuePublisherTodo(eventId, todoId) {
        this._queuePublishTodo.push({ eventId, todoId });
    }
    requestPublishTodo() {
        const publishTodo = this._queuePublishTodo.pop();
        if (!publishTodo)
            return;
        if (!publishTodo.eventId || !publishTodo.todoId)
            return;
        this._ws.send(`/pub/todolist/${publishTodo.eventId}/${publishTodo.todoId}/publish`, "");
    }
    pushMessage(message, expireTime) {
        this._msgr.pushMessage(message, expireTime);
    }
}
//# sourceMappingURL=TodoMediator.js.map