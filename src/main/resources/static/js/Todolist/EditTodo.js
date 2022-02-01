import * as util from "../Common";
import { TODO } from "./TodoView";
export class EditTodo {
    // 初期化処理
    constructor() {
        this._eventIdElm = document.getElementById("hid-edit-event-id");
        this._todoIdElm = document.getElementById("hid-edit-todo-id");
        this._createUserIdElm = document.getElementById("hid-edit-create-user-id");
        this._createUserNameElm = document.getElementById("hid-edit-create-user-name");
        this._createDatetimeElm = document.getElementById("hid-edit-create-datetime");
        this._updateUserIdElm = document.getElementById("hid-edit-update-user-id");
        this._updateUserNameElm = document.getElementById("hid-edit-update-user-name");
        this._updateDatetimeElm = document.getElementById("hid-edit-update-datetime");
        this._areaElm = document.getElementById("edit-todo-area");
        this._titleElm = document.getElementById("txt-edit-todo-title");
        this._contentElm = document.getElementById("txta-edit-todo-content");
        this._checklistArea = document.querySelector("#checklist-area ul.checklist");
        this._addCheckBoxBtn = document.getElementById("btn-add-checklist");
        this._reminderNoticeTimeElm = document.getElementById("slct-edit-reminder-notice-time");
        this._reminderRepeatElm = document.getElementById("slct-edit-reminder-repeat");
        this._startDateElm = document.getElementById("txt-edit-start-date");
        this._startTimeElm = document.getElementById("txt-edit-start-time");
        this._saveTodoBtn = document.getElementById("btn-save-todo");
        this._cancelBtn = document.getElementById("btn-cancel-todo");
        this._checklistTemplate = this.createTemplateCheckItem();
        this._addEventAddCheckList();
        this._addEventSave();
        this._addEventCancel();
    }
    setUpEditCard(elm) {
        this._eventIdElm.value = document.querySelector(".choose-event.select")?.value || "";
        if (!this._eventIdElm.value) {
            throw new Error("イベントIDがありません。");
        }
        if (elm !== "") {
            this._copyToEditCard(elm);
        }
        this._addEventDeleteCheckItemBtn();
    }
    _copyToEditCard(elm) {
        this._todoIdElm.value = elm.querySelector(".todo-id")?.value || "";
        this._titleElm.value = elm.querySelector(".text.title")?.value || "";
        this._contentElm.value = elm.querySelector(".text.content")?.value || "";
        this._reminderNoticeTimeElm.value = elm.querySelector(".select.reminder-notice-time")?.value || "";
        this._reminderRepeatElm.value = elm.querySelector(".select.reminder-repeat")?.value || "";
        this._startDateElm.value = elm.querySelector(".text.todo-start-date")?.value || "";
        this._startTimeElm.value = elm.querySelector(".text.todo-start-time")?.value || "";
        this._createUserIdElm.value = elm.querySelector(".hid.todo-create-user-id")?.value || "";
        this._createUserNameElm.value = elm.querySelector(".hid.todo-create-user-name")?.value || "";
        this._createDatetimeElm.value = elm.querySelector(".hid.todo-create-datetime")?.value || "";
        this._updateUserIdElm.value = elm.querySelector(".hid.todo-update-user-id")?.value || "";
        this._updateUserNameElm.value = elm.querySelector(".hid.todo-update-user-name")?.value || "";
        this._updateDatetimeElm.value = elm.querySelector(".hid.todo-update-datetime")?.value || "";
        const checklist = elm.querySelectorAll("ul.checklist li");
        for (let checkItem of checklist) {
            this._checklistArea.appendChild(checkItem.cloneNode(true));
        }
    }
    clear() {
        this._eventIdElm.value = "";
        this._todoIdElm.value = "";
        this._titleElm.value = "";
        this._contentElm.value = "";
        while (this._checklistArea.firstChild) {
            this._checklistArea.removeChild(this._checklistArea.firstChild);
        }
        this._createUserIdElm.value = "";
        this._createUserNameElm.value = "";
        this._createDatetimeElm.value = "";
        this._updateUserIdElm.value = "";
        this._updateUserNameElm.value = "";
        this._updateDatetimeElm.value = "";
        this._reminderNoticeTimeElm.value = "";
        this._reminderRepeatElm.value = "";
        this._startDateElm.value = "";
        this._startTimeElm.value = "";
    }
    // 各ボタンのイベントを定義する
    _addEventAddCheckList() {
        // 追加ボタンクリック時は、チェックボックス要素を追加する
        this._addCheckBoxBtn.addEventListener("click", () => {
            const cloneCheckItem = this._checklistTemplate.cloneNode(true);
            this._checklistArea.appendChild(cloneCheckItem);
            const delBtn = cloneCheckItem.querySelector(".delete-btn-checklist");
            if (delBtn === null)
                return;
            this._applyEventDeleteCheckItem(delBtn);
        }, false);
    }
    _addEventSave() {
        // 保存ボタンクリック時は、現在編集中のTODOリストの内容をサーバーに送信して、TODOリストに反映させる
        this._saveTodoBtn.addEventListener("click", () => {
            // const json = this.createJson();
            // const url = "/pub/todolist/" + this._todoIdElm.value + "/save";
            // TODO.mediator.saveTodo(url, JSON.stringify(json));
            // this._stompClient.send(url, {}, JSON.stringify(json));
            this.sendTodoJson();
        }, false);
    }
    _addEventCancel() {
        // キャンセルボタンクリック時は、現在編集中の内容を破棄して閉じる
        this._cancelBtn.addEventListener("click", () => {
            TODO.mediator.closeTodo();
        }, false);
    }
    sendTodoJson() {
        const json = this.createJson();
        console.log(json);
        const csrfHeader = document.querySelector('meta[name="_csrf_header"]')?.content || "";
        const token = document.querySelector('meta[name="_csrf"]')?.content || "";
        const todoId = json.todoId;
        // デフォルトは登録用の処理
        let url = `/todolist/save`;
        if (todoId) {
            url = `/todolist/${todoId}/save`;
        }
        fetch(url, {
            //			credentials: "same-origin",
            method: "POST",
            headers: {
                "charset": "UTF-8",
                "Content-Type": "application/json",
                [csrfHeader]: token,
            },
            body: JSON.stringify(json)
        }).then((res) => {
            if (!res.ok) {
                throw new Error(`${res.status}${res.statusText}`);
            }
            console.log(res);
            return res.json();
        }).then((data) => {
            console.log(data);
            TODO.mediator.pushMessage(`${data.message}`, 10000);
        }).catch((reason) => {
            console.log(reason);
        });
    }
    // チェックアイテム横にある、削除ボタンのイベントを定義する
    _addEventDeleteCheckItemBtn() {
        const checkItemDeleteBtns = this._checklistArea.querySelectorAll(".delete-btn-checklist");
        for (let btn of checkItemDeleteBtns) {
            this._applyEventDeleteCheckItem(btn);
        }
    }
    _applyEventDeleteCheckItem(elm) {
        elm.addEventListener("click", () => {
            let delElm = util.findParent(elm, "li");
            if (delElm === null)
                return;
            delElm.remove();
        }, false);
    }
    // チェックリストのテンプレート要素を作成する
    createTemplateCheckItem() {
        const li = document.createElement("li");
        const hidseq = document.createElement("input");
        hidseq.type = "hidden";
        hidseq.classList.add("checklist");
        hidseq.classList.add("seq");
        const label1 = document.createElement("label");
        const label2 = document.createElement("label");
        const textNode = document.createTextNode("\r\n");
        const span = document.createElement("span");
        span.classList.add("label");
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.classList.add("checklist");
        checkbox.classList.add("checkbox");
        checkbox.classList.add("status");
        const text = document.createElement("input");
        text.type = "text";
        text.classList.add("checklist");
        text.classList.add("text");
        text.placeholder = "◯◯を買う。";
        const delBtn = document.createElement("button");
        delBtn.type = "button";
        delBtn.classList.add("delete-btn-checklist");
        delBtn.innerText = "×";
        label1.appendChild(checkbox);
        label2.appendChild(span);
        label2.appendChild(text);
        label2.appendChild(textNode.cloneNode(true));
        label2.appendChild(delBtn);
        li.appendChild(hidseq);
        li.appendChild(label1);
        li.appendChild(textNode.cloneNode(true));
        li.appendChild(label2);
        return li;
    }
    createJson() {
        const json = {
            eventId: this._eventIdElm.value,
            todoId: this._todoIdElm.value,
            title: this._titleElm.value,
            content: this._contentElm.value,
            checkList: this.collectCheckItems(this._areaElm),
            todoStartDate: this._startDateElm.value,
            todoStartTime: this._startTimeElm.value,
            todoEndDateTime: "",
            reminderRepeat: this._reminderRepeatElm.value,
            reminderNoticeTime: this._reminderNoticeTimeElm.value,
            createUserId: this._createUserIdElm.value,
            createUserName: this._createUserNameElm.value,
            createDatetime: this._createDatetimeElm.value,
            updateUserId: this._updateUserIdElm.value,
            updateUserName: this._updateUserNameElm.value,
            updateDatetime: this._updateDatetimeElm.value
        };
        return json;
    }
    // チェックリストの配列を返す。配列内の要素はJson形式
    collectCheckItems(todoArea) {
        if (todoArea === null)
            return new Array();
        const checklist = todoArea.querySelectorAll("ul.checklist li");
        let maxSeq = 0;
        const jsons = new Array();
        const newCheckItems = new Array();
        // 全チェックリストの処理
        for (let checkItem of checklist) {
            const checkItemEventId = todoArea.querySelector(".event-id")?.value || "";
            const checkItemTodoId = todoArea.querySelector(".todo-id")?.value || "";
            const checkItemStatus = checkItem.querySelector(".checklist.checkbox.status")?.value || "";
            const checkItemContent = checkItem.querySelector(".checklist.text")?.value || "";
            const checkItemSeq = checkItem.querySelector(".checklist.seq")?.value || "";
            // 新規で作成されたチェックリストは、後で処理するための配列に入れておく
            if (!checkItemSeq) {
                newCheckItems.push(checkItem);
                continue;
            }
            const numCheckItemSeq = parseInt(checkItemSeq);
            if (maxSeq < numCheckItemSeq) {
                maxSeq = numCheckItemSeq;
            }
            jsons.push({
                eventId: checkItemEventId,
                todoId: checkItemTodoId,
                seq: numCheckItemSeq,
                status: checkItemStatus,
                content: checkItemContent
            });
        }
        // 新しく生成されたチェックリストの処理
        for (let newCheckItem of newCheckItems) {
            const checkItemEventId = todoArea.querySelector(".event-id")?.value || "";
            const checkItemTodoId = todoArea.querySelector(".todo-id")?.value || "";
            const checkItemSeq = ++maxSeq;
            const checkItemStatus = newCheckItem.querySelector(".checklist.checkbox.status")?.checked || false;
            const checkItemContent = newCheckItem.querySelector(".checklist.text")?.value || "";
            jsons.push({
                eventId: checkItemEventId,
                todoId: checkItemTodoId,
                seq: checkItemSeq,
                status: String(checkItemStatus),
                content: checkItemContent
            });
        }
        return jsons;
    }
    isNew() {
        return !(this._todoIdElm.value);
    }
}
//# sourceMappingURL=EditTodo.js.map