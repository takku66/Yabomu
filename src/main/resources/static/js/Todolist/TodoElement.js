import { CheckListElement as CheckListElement } from "./CheckListElement";
export class TodoElement {
    constructor(todoBoxElm) {
        // 本インスタンスのメンバ変数を初期化する
        this._eventId = todoBoxElm.getElementsByClassName(TodoElement.CLS.eventId)[0];
        this._todoId = todoBoxElm.getElementsByClassName(TodoElement.CLS.todoId)[0];
        this._title = todoBoxElm.getElementsByClassName(TodoElement.CLS.txtTitle)[0];
        this._lblTitle = todoBoxElm.getElementsByClassName(TodoElement.CLS.lblTitle)[0];
        this._content = todoBoxElm.getElementsByClassName(TodoElement.CLS.txtContent)[0];
        this._lblContent = todoBoxElm.getElementsByClassName(TodoElement.CLS.lblContent)[0];
        this._reminderNoticeTime = todoBoxElm.getElementsByClassName(TodoElement.CLS.reminderNoticeTime)[0];
        this._reminderRepeat = todoBoxElm.getElementsByClassName(TodoElement.CLS.reminderRepeat)[0];
        this._startDate = todoBoxElm.getElementsByClassName(TodoElement.CLS.txtStartDate)[0];
        this._startTime = todoBoxElm.getElementsByClassName(TodoElement.CLS.txtStartTime)[0];
        this._lblStartDateTime = todoBoxElm.getElementsByClassName(TodoElement.CLS.lblStartDateTime)[0];
        this._createUserId = todoBoxElm.getElementsByClassName(TodoElement.CLS.hidCreateUserId)[0];
        this._createUserName = todoBoxElm.getElementsByClassName(TodoElement.CLS.hidCreateusername)[0];
        this._createDatetime = todoBoxElm.getElementsByClassName(TodoElement.CLS.hidCreatedatetime)[0];
        this._updateUserId = todoBoxElm.getElementsByClassName(TodoElement.CLS.hidUpdateuserid)[0];
        this._updateUserName = todoBoxElm.getElementsByClassName(TodoElement.CLS.hidUpdateusername)[0];
        this._updateDatetime = todoBoxElm.getElementsByClassName(TodoElement.CLS.hidUpdatedatetime)[0];
        this._checklist = new CheckListElement(todoBoxElm);
    }
    /**
     *
     * @param todoData
     */
    copyFrom(todoData) {
        if (this._eventId)
            this._eventId.value = todoData.eventId;
        if (this._todoId)
            this._todoId.value = todoData.todoId;
        this.changeTitle(todoData.title);
        this.changeContent(todoData.content);
        this.changeReminderNoticeTime(todoData.reminderNoticeTime);
        this.changeReminderRepeat(todoData.reminderRepeat);
        this.changeStartDate(todoData.todoStartDate);
        this.changeStartTime(todoData.todoStartTime);
        if (this._createUserId)
            this._createUserId.value = todoData.createUserId;
        if (this._createUserName)
            this._createUserName.value = todoData.createUserName;
        if (this._createDatetime)
            this._createDatetime.value = todoData.createDatetime;
        if (this._updateUserId)
            this._updateUserId.value = todoData.updateUserId;
        if (this._updateUserName)
            this._updateUserName.value = todoData.updateUserName;
        if (this._updateDatetime)
            this._updateDatetime.value = todoData.updateDatetime;
        this._checklist?.copyFrom(todoData.checkList);
    }
    /**
     * イベントIDとTODO ID以外の全ての要素をデフォルト値にクリアする
     */
    clear() {
        if (this._eventId)
            this._eventId.value = "";
        if (this._todoId)
            this._todoId.value = "";
        if (this._title)
            this._title.value = "";
        if (this._lblTitle)
            this._lblTitle.innerText = "";
        if (this._content)
            this._content.value = "";
        if (this._lblContent)
            this._lblContent.innerText = "";
        if (this._reminderNoticeTime)
            this._reminderNoticeTime.value = "";
        if (this._reminderRepeat)
            this._reminderRepeat.value = "";
        if (this._startDate)
            this._startDate.value = "";
        if (this._startTime)
            this._startTime.value = "";
        if (this._lblStartDateTime)
            this._lblStartDateTime.innerText = "";
        if (this._createUserId)
            this._createUserId.value = "";
        if (this._createUserName)
            this._createUserName.value = "";
        if (this._createDatetime)
            this._createDatetime.value = "";
        if (this._updateUserId)
            this._updateUserId.value = "";
        if (this._updateUserName)
            this._updateUserName.value = "";
        if (this._updateDatetime)
            this._updateDatetime.value = "";
        if (this._checklist)
            this._checklist.clear();
    }
    // ----- 参照のみ
    eventId() {
        if (this._eventId) {
            return this._eventId.value;
        }
        return "";
    }
    todoId() {
        if (this._todoId) {
            return this._todoId.value;
        }
        return "";
    }
    // ----- 参照・更新可能
    title() {
        if (this._title) {
            return this._title.value;
        }
        return "";
    }
    changeTitle(title) {
        if (this._title) {
            this._title.value = title;
        }
        if (this._lblTitle) {
            this._lblTitle.innerText = title;
        }
    }
    content() {
        if (this._content) {
            return this._content.value;
        }
        return "";
    }
    changeContent(content) {
        if (this._content) {
            this._content.value = content;
        }
        if (this._lblContent) {
            this._lblContent.innerText = content;
        }
    }
    reminderNoticeTime() {
        if (this._reminderNoticeTime) {
            return this._reminderNoticeTime.value;
        }
        return "";
    }
    changeReminderNoticeTime(reminderNoticeTime) {
        if (this._reminderNoticeTime) {
            this._reminderNoticeTime.value = reminderNoticeTime;
        }
    }
    reminderRepeat() {
        if (this._reminderRepeat) {
            return this._reminderRepeat.value;
        }
        return "";
    }
    changeReminderRepeat(reminderRepeat) {
        if (this._reminderRepeat) {
            this._reminderRepeat.value = reminderRepeat;
        }
    }
    startDate() {
        if (this._startDate) {
            return this._startDate.value;
        }
        return "";
    }
    startTime() {
        if (this._startTime) {
            return this._startTime.value;
        }
        return "";
    }
    changeStartDate(startDate) {
        if (this._startDate) {
            this._startDate.value = startDate;
        }
        if (this._lblStartDateTime) {
            const startTime = this._startTime?.value;
            this._lblStartDateTime.innerText = `${startDate} ${startTime}`;
        }
    }
    changeStartTime(startTime) {
        if (this._startTime) {
            this._startTime.value = startTime;
        }
        if (this._lblStartDateTime) {
            const startDate = this._startDate?.value;
            this._lblStartDateTime.innerText = `${startDate} ${startTime}`;
        }
    }
    checklistStatus() {
        return this._checklist?.checklistStatus() || [""];
    }
    checklistContent() {
        return this._checklist?.checklistContent() || [""];
    }
    isExistsAnyCheckItem() {
        return this._checklist?.isExistsAnyCheckItem() || false;
    }
    createUserId() {
        if (this._createUserId) {
            return this._createUserId.value;
        }
        return "";
    }
    createUserName() {
        if (this._createUserName) {
            return this._createUserName.value;
        }
        return "";
    }
    createDatetime() {
        if (this._createDatetime) {
            return this._createDatetime.value;
        }
        return "";
    }
    updateUserId() {
        if (this._updateUserId) {
            return this._updateUserId.value;
        }
        return "";
    }
    updateUserName() {
        if (this._updateUserName) {
            return this._updateUserName.value;
        }
        return "";
    }
    updateDatetime() {
        if (this._updateDatetime) {
            return this._updateDatetime.value;
        }
        return "";
    }
}
TodoElement.CLS = {
    eventId: "event-id",
    todoId: "todo-id",
    txtTitle: "title text",
    lblTitle: "title label",
    txtContent: "content text",
    lblContent: "content label",
    reminderNoticeTime: "reminder-notice-time select",
    reminderRepeat: "reminder-repeat select",
    txtStartDate: "todo-start-date text",
    txtStartTime: "todo-start-time text",
    lblStartDateTime: "todo-start-datetime label",
    hidCreateUserId: "todo-create-user-id hid",
    hidCreateusername: "todo-create-user-name hid",
    hidCreatedatetime: "todo-create-datetime hid",
    hidUpdateuserid: "todo-update-user-id hid",
    hidUpdateusername: "todo-update-user-name hid",
    hidUpdatedatetime: "todo-update-datetime hid",
};
//# sourceMappingURL=TodoElement.js.map