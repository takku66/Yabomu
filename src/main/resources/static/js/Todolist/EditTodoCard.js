export class EditTodoCard {
    constructor(editTodoElm) {
        this._eventId = editTodoElm.getElementsByClassName("event-id")[0];
        this._todoId = editTodoElm.getElementsByClassName("todo-id")[0];
        this._title = editTodoElm.getElementsByClassName("text title")[0];
        this._content = editTodoElm.getElementsByClassName("text content")[0];
        this._reminderNoticeTime = editTodoElm.getElementsByClassName("select reminder-notice-time")[0];
        this._reminderRepeat = editTodoElm.getElementsByClassName("select reminder-repeat")[0];
        this._startDate = editTodoElm.getElementsByClassName("text todo-start-date")[0];
        this._startTime = editTodoElm.getElementsByClassName("text todo-start-time")[0];
        this._createUserId = editTodoElm.getElementsByClassName("hid todo-create-user-id")[0];
        this._createUserName = editTodoElm.getElementsByClassName("hid todo-create-user-name")[0];
        this._createDatetime = editTodoElm.getElementsByClassName("hid todo-create-datetime")[0];
        this._updateUserId = editTodoElm.getElementsByClassName("hid todo-update-user-id")[0];
        this._updateUserName = editTodoElm.getElementsByClassName("hid todo-update-user-name")[0];
        this._updateDatetime = editTodoElm.getElementsByClassName("hid todo-update-datetime")[0];
        this._checklistArea = editTodoElm.querySelector("ul.checklist");
        if (this._checklistArea != null) {
            this._checklist = this._checklistArea.getElementsByClassName("check_item");
        }
        else {
            this._checklist = null;
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
    }
    changeStartTime(startTime) {
        if (this._startTime) {
            this._startTime.value = startTime;
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
//# sourceMappingURL=EditTodoCard.js.map