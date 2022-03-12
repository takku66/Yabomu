import * as util from "../Common";
import { TODO } from "./TodoView";
import { TransactionInfo } from "../Common";
import { CheckItemElement, CheckListElement } from "./CheckListElement";
export class EditTodo {
    // 初期化処理
    constructor() {
        this._eventIdElm = document.getElementById(EditTodo.ET_IDS.eventIdElm);
        this._todoIdElm = document.getElementById(EditTodo.ET_IDS.todoIdElm);
        this._createUserIdElm = document.getElementById(EditTodo.ET_IDS.createUserIdElm);
        this._createUserNameElm = document.getElementById(EditTodo.ET_IDS.createUserNameElm);
        this._createDatetimeElm = document.getElementById(EditTodo.ET_IDS.createDatetimeElm);
        this._updateUserIdElm = document.getElementById(EditTodo.ET_IDS.updateUserIdElm);
        this._updateUserNameElm = document.getElementById(EditTodo.ET_IDS.updateUserNameElm);
        this._updateDatetimeElm = document.getElementById(EditTodo.ET_IDS.updateDatetimeElm);
        this._areaElm = document.getElementById(EditTodo.ET_IDS.areaElm);
        this._titleElm = document.getElementById(EditTodo.ET_IDS.titleElm);
        this._contentElm = document.getElementById(EditTodo.ET_IDS.contentElm);
        this._checklistArea = document.getElementById(EditTodo.ET_IDS.checklistArea);
        this._checklist = new CheckListElement(this._areaElm);
        this._addCheckBoxBtn = document.getElementById(EditTodo.ET_IDS.addCheckBoxBtn);
        this._reminderNoticeTimeElm = document.getElementById(EditTodo.ET_IDS.reminderNoticeTimeElm);
        this._reminderRepeatElm = document.getElementById(EditTodo.ET_IDS.reminderRepeatElm);
        this._startDateElm = document.getElementById(EditTodo.ET_IDS.startDateElm);
        this._startTimeElm = document.getElementById(EditTodo.ET_IDS.startTimeElm);
        this._saveTodoBtn = document.getElementById(EditTodo.ET_IDS.saveTodoBtn);
        this._cancelBtn = document.getElementById(EditTodo.ET_IDS.cancelBtn);
        this._deleteBtn = document.getElementById(EditTodo.ET_IDS.deleteBtn);
        this._checklistTemplate = CheckItemElement.createTemplateCheckItem();
        this._addEventAddCheckList();
        this._addEventSave();
        this._addEventCancel();
        this._addEventDelete();
    }
    setUpEditCard(elm) {
        this._eventIdElm.value = document.getElementsByClassName("choose-event select")[0]?.value || "";
        if (!this._eventIdElm.value) {
            throw new Error("イベントIDがありません。");
        }
        if (elm !== undefined) {
            this._copyToEditCard(elm);
        }
        this._addEventDeleteCheckItemBtn();
    }
    copyToEditCard(elm) {
        this._copyToEditCard(elm);
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
            this.sendTodoJson();
        }, false);
    }
    _addEventCancel() {
        // キャンセルボタンクリック時は、現在編集中の内容を破棄して閉じる
        this._cancelBtn.addEventListener("click", () => {
            TODO.mediator.closeTodo();
        }, false);
    }
    _addEventDelete() {
        this._deleteBtn.addEventListener("click", () => {
            TODO.mediator.requestPublishDeleteTodo(this._eventIdElm.value, this._todoIdElm.value);
        }, false);
    }
    sendTodoJson() {
        const json = this.createJson();
        const todoId = json.todoId;
        let url = `/todolist/${json.eventId}/new/save`;
        if (todoId) {
            url = `/todolist/${json.eventId}/${json.todoId}/save`;
        }
        // TODO.mediator.saveTodo(url, JSON.stringify(json));
        console.log(json);
        const csrfHeader = document.querySelector('meta[name="_csrf_header"]')?.content || "";
        const token = document.querySelector('meta[name="_csrf"]')?.content || "";
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
            return res.text();
        }).then((data) => {
            console.log(data);
            const transactionInfo = new TransactionInfo(data);
            const returnTodo = transactionInfo.getData();
            TODO.mediator.requestPublishTodo(returnTodo.eventId, returnTodo.todoId);
            TODO.mediator.pushMessage(`${transactionInfo.getMessage()}`, 10000);
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
    // TODO CheckListElementに移す
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
                completed: String(checkItemStatus) === "on" ? "true" : "false",
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
                completed: String(checkItemStatus) === "on" ? "true" : "false",
                content: checkItemContent
            });
        }
        return jsons;
    }
    isNew() {
        return !(this._todoIdElm.value);
    }
}
EditTodo.ET_IDS = {
    eventIdElm: "hid-edit-event-id",
    todoIdElm: "hid-edit-todo-id",
    createUserIdElm: "hid-edit-create-user-id",
    createUserNameElm: "hid-edit-create-user-name",
    createDatetimeElm: "hid-edit-create-datetime",
    updateUserIdElm: "hid-edit-update-user-id",
    updateUserNameElm: "hid-edit-update-user-name",
    updateDatetimeElm: "hid-edit-update-datetime",
    areaElm: "edit-todo-area",
    titleElm: "txt-edit-todo-title",
    contentElm: "txta-edit-todo-content",
    checklistArea: "checklist-edit-list-area",
    addCheckBoxBtn: "btn-add-checklist",
    reminderNoticeTimeElm: "slct-edit-reminder-notice-time",
    reminderRepeatElm: "slct-edit-reminder-repeat",
    startDateElm: "txt-edit-start-date",
    startTimeElm: "txt-edit-start-time",
    saveTodoBtn: "btn-save-todo",
    cancelBtn: "btn-cancel-todo",
    deleteBtn: "btn-delete-todo",
};
//# sourceMappingURL=EditTodo.js.map