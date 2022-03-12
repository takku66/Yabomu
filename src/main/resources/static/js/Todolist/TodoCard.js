export class TodoCard {
    constructor(todoBoxElm) {
        this._eventId = todoBoxElm.getElementsByClassName("event-id")[0];
        this._todoId = todoBoxElm.getElementsByClassName("todo-id")[0];
        this._title = todoBoxElm.getElementsByClassName("text title")[0];
        this._lblTitle = todoBoxElm.getElementsByClassName("label title")[0];
        this._content = todoBoxElm.getElementsByClassName("text content")[0];
        this._lblContent = todoBoxElm.getElementsByClassName("label content")[0];
        this._reminderNoticeTime = todoBoxElm.getElementsByClassName("select reminder-notice-time")[0];
        this._reminderRepeat = todoBoxElm.getElementsByClassName("select reminder-repeat")[0];
        this._startDate = todoBoxElm.getElementsByClassName("text todo-start-date")[0];
        this._startTime = todoBoxElm.getElementsByClassName("text todo-start-time")[0];
        this._lblStartDateTime = todoBoxElm.getElementsByClassName("label todo-start-datetime")[0];
        this._createUserId = todoBoxElm.getElementsByClassName("hid todo-create-user-id")[0];
        this._createUserName = todoBoxElm.getElementsByClassName("hid todo-create-user-name")[0];
        this._createDatetime = todoBoxElm.getElementsByClassName("hid todo-create-datetime")[0];
        this._updateUserId = todoBoxElm.getElementsByClassName("hid todo-update-user-id")[0];
        this._updateUserName = todoBoxElm.getElementsByClassName("hid todo-update-user-name")[0];
        this._updateDatetime = todoBoxElm.getElementsByClassName("hid todo-update-datetime")[0];
        this._checklistArea = todoBoxElm.querySelector("ul.checklist");
        if (this._checklistArea != null) {
            this._checklist = this._checklistArea.getElementsByClassName("check_item");
        }
        else {
            this._checklist = null;
        }
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
        if (this._checklistArea && this._checklist) {
            Array.from(this._checklist).forEach((e) => {
                this._checklistArea?.removeChild(e);
            });
        }
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
    reminderRepeat() {
        if (this._reminderRepeat) {
            return this._reminderRepeat.value;
        }
        return "";
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
            this._lblStartDateTime.innerText = `${startDate} &nbsp; ${startTime}`;
        }
    }
    changeStartTime(startTime) {
        if (this._startTime) {
            this._startTime.value = startTime;
        }
        if (this._lblStartDateTime) {
            const startDate = this._startDate?.value;
            this._lblStartDateTime.innerText = `${startDate} &nbsp; ${startTime}`;
        }
    }
    checklistStatus() {
        if (this._checklist) {
            return Array.from(this._checklist).map((e) => {
                return e.getElementsByClassName("checklist checkbox status")[0].value;
            });
        }
        return [""];
    }
    checklistContent() {
        if (this._checklist) {
            return Array.from(this._checklist).map((e) => {
                return e.getElementsByClassName("checklist text")[0].value;
            });
        }
        return [""];
    }
    isExistsAnyCheckItem() {
        if (this._checklist != null && this._checklist.length > 0) {
            return true;
        }
        return false;
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
//# sourceMappingURL=TodoCard.js.map