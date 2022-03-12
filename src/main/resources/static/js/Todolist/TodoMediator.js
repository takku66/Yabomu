export class TodoMediator {
    constructor(todoView, editTodo, ybmWebSocket, messenger) {
        this._todoView = todoView;
        this._editTodo = editTodo;
        this._ws = ybmWebSocket;
        this._msgr = messenger;
        this._queuePublishTodo = [];
    }
    /**
     * イベントIDごとのWebSocketコネクションを接続する
     * データ受け取り後は、{@link TodoView.receiveUpdatedTodo} を実行する
     * @param eventId - TODOの親キーであるイベントID
     */
    connectWebSocket(eventId) {
        // MYNOTE:コールバック関数をそのまま渡してしまうと、関数内のthisの参照がundefinedになってしまう
        // アロー関数を使って、静的にthisを決定させる。
        this._ws.connectWebSocket(`/sub/todolist/${eventId}`, (data) => {
            this._todoView.receiveUpdatedTodo(data);
        });
    }
    /**
     * WebSocket通信を切断する
     */
    disconnectWebSocket() {
        this._ws.disconnectWebSocket();
    }
    /**
     * 編集用のTODOエリアを開く
     * @param elm - 編集したいTODO | 指定がなければ、新規のTODOエリア
     */
    openTodo(elm) {
        this._editTodo.setUpEditCard(elm);
        this._todoView.openTodo();
    }
    closeTodo() {
        this._editTodo.clear();
        this._todoView.closeTodo();
    }
    isOpeningEditArea() {
        return this._todoView.isOpeningEditArea();
    }
    /**
     * 編集用のTODOエリアに、指定のTODO要素の値をコピーする
     * @param elm - 値を反映したいTODO要素
     */
    copyEditTodo(elm) {
        this._editTodo.copyToEditCard(elm);
    }
    saveTodo(url, stringifiedJson) {
        this._ws.send(url, stringifiedJson);
    }
    queuePublisherTodo(eventId, todoId) {
        this._queuePublishTodo.push({ eventId, todoId });
    }
    requestPublishTodoFromQueue() {
        const publishTodo = this._queuePublishTodo.pop();
        if (!publishTodo) {
            throw new Error("キューから値の取得に失敗");
        }
        const pubEventId = publishTodo.eventId;
        const pubTodoId = publishTodo.todoId;
        if (!pubEventId || !pubTodoId) {
            throw new Error("キューから値の取得に失敗");
        }
        this._ws.send(`/pub/todolist/${pubEventId}/${pubTodoId}/publish`, "");
    }
    requestPublishTodo(eventId, todoId) {
        if (!eventId || !todoId) {
            throw new Error("値の不明なEventId, TodoId");
        }
        this._ws.send(`/pub/todolist/${eventId}/${todoId}/publish`, "");
    }
    requestPublishDeleteTodo(eventId, todoId) {
        if (!eventId || !todoId) {
            throw new Error("値の不明なEventId, TodoId");
        }
        this._ws.send(`/pub/todolist/${eventId}/${todoId}/publish/delete`, "");
    }
    pushMessage(message, expireTime) {
        this._msgr.pushMessage(message, expireTime);
    }
}
//# sourceMappingURL=TodoMediator.js.map