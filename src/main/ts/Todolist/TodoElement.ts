import { CheckListElement as CheckListElement } from "./CheckListElement";
import { ITodoData } from "./ITodoData";

export class TodoElement {
    _eventId: HTMLInputElement | null;
    _todoId: HTMLInputElement | null;
    _title: HTMLInputElement | null;
    _lblTitle: HTMLElement | null;
    _content: HTMLInputElement | null;
    _lblContent: HTMLElement | null;
    _reminderNoticeTime: HTMLInputElement | null;
    _reminderRepeat: HTMLInputElement | null;
    _startDate: HTMLInputElement | null;
    _startTime: HTMLInputElement | null;
    _lblStartDateTime: HTMLElement | null;
    _createUserId: HTMLInputElement | null;
    _createUserName: HTMLInputElement | null;
    _createDatetime: HTMLInputElement | null;
    _updateUserId: HTMLInputElement | null;
    _updateUserName: HTMLInputElement | null;
    _updateDatetime: HTMLInputElement | null;
    _checklist: CheckListElement | null;


    static CLS = {
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


    constructor(todoBoxElm: HTMLElement){
        // 本インスタンスのメンバ変数を初期化する
        this._eventId = <HTMLInputElement>todoBoxElm.getElementsByClassName(TodoElement.CLS.eventId)[0];
		this._todoId = <HTMLInputElement>todoBoxElm.getElementsByClassName(TodoElement.CLS.todoId)[0];
		this._title = <HTMLInputElement>todoBoxElm.getElementsByClassName(TodoElement.CLS.txtTitle)[0];
        this._lblTitle = <HTMLElement>todoBoxElm.getElementsByClassName(TodoElement.CLS.lblTitle)[0];
		this._content = <HTMLInputElement>todoBoxElm.getElementsByClassName(TodoElement.CLS.txtContent)[0];
        this._lblContent = <HTMLElement>todoBoxElm.getElementsByClassName(TodoElement.CLS.lblContent)[0];
		this._reminderNoticeTime = <HTMLInputElement>todoBoxElm.getElementsByClassName(TodoElement.CLS.reminderNoticeTime)[0];
		this._reminderRepeat = <HTMLInputElement>todoBoxElm.getElementsByClassName(TodoElement.CLS.reminderRepeat)[0];
		this._startDate = <HTMLInputElement>todoBoxElm.getElementsByClassName(TodoElement.CLS.txtStartDate)[0];
		this._startTime = <HTMLInputElement>todoBoxElm.getElementsByClassName(TodoElement.CLS.txtStartTime)[0];
        this._lblStartDateTime = <HTMLElement>todoBoxElm.getElementsByClassName(TodoElement.CLS.lblStartDateTime)[0];
		this._createUserId = <HTMLInputElement>todoBoxElm.getElementsByClassName(TodoElement.CLS.hidCreateUserId)[0];
		this._createUserName = <HTMLInputElement>todoBoxElm.getElementsByClassName(TodoElement.CLS.hidCreateusername)[0];
		this._createDatetime = <HTMLInputElement>todoBoxElm.getElementsByClassName(TodoElement.CLS.hidCreatedatetime)[0];
		this._updateUserId = <HTMLInputElement>todoBoxElm.getElementsByClassName(TodoElement.CLS.hidUpdateuserid)[0];
		this._updateUserName = <HTMLInputElement>todoBoxElm.getElementsByClassName(TodoElement.CLS.hidUpdateusername)[0];
		this._updateDatetime = <HTMLInputElement>todoBoxElm.getElementsByClassName(TodoElement.CLS.hidUpdatedatetime)[0];
        this._checklist = new CheckListElement(todoBoxElm);
    }

    /**
     * 
     * @param todoData 
     */
    public copyFrom(todoData: ITodoData): void{
        if(this._eventId)this._eventId.value = todoData.eventId;
        if(this._todoId)this._todoId.value = todoData.todoId;
        this.changeTitle(todoData.title);
        this.changeContent(todoData.content);
        this.changeReminderNoticeTime(todoData.reminderNoticeTime);
        this.changeReminderRepeat(todoData.reminderRepeat);
        this.changeStartDate(todoData.todoStartDate);
        this.changeStartTime(todoData.todoStartTime);
        if(this._createUserId)this._createUserId.value = todoData.createUserId;
        if(this._createUserName)this._createUserName.value = todoData.createUserName;
        if(this._createDatetime)this._createDatetime.value = todoData.createDatetime;
        if(this._updateUserId)this._updateUserId.value = todoData.updateUserId;
        if(this._updateUserName)this._updateUserName.value = todoData.updateUserName;
        if(this._updateDatetime)this._updateDatetime.value = todoData.updateDatetime;
        this._checklist?.copyFrom(todoData.checkList);
    }

    /**
     * イベントIDとTODO ID以外の全ての要素をデフォルト値にクリアする
     */
    public clear(){
        if(this._eventId)this._eventId.value = "";
        if(this._todoId)this._todoId.value = "";
        if(this._title)this._title.value = "";
        if(this._lblTitle)this._lblTitle.innerText = "";
        if(this._content)this._content.value = "";
        if(this._lblContent)this._lblContent.innerText = "";
        if(this._reminderNoticeTime)this._reminderNoticeTime.value = "";
        if(this._reminderRepeat)this._reminderRepeat.value = "";
        if(this._startDate)this._startDate.value = "";
        if(this._startTime)this._startTime.value = "";
        if(this._lblStartDateTime)this._lblStartDateTime.innerText = "";
        if(this._createUserId)this._createUserId.value = "";
        if(this._createUserName)this._createUserName.value = "";
        if(this._createDatetime)this._createDatetime.value = "";
        if(this._updateUserId)this._updateUserId.value = "";
        if(this._updateUserName)this._updateUserName.value = "";
        if(this._updateDatetime)this._updateDatetime.value = "";
        if(this._checklist)this._checklist.clear();
    }

    // ----- 参照のみ
    public eventId(): string{
        if(this._eventId){
            return this._eventId.value;
        }
        return "";
    }
    public todoId(): string{
        if(this._todoId){
            return this._todoId.value;
        }
        return "";
    }

    // ----- 参照・更新可能
    public title(): string{
        if(this._title){
            return this._title.value;
        }
        return "";
    }
    public changeTitle(title: string): void{
        if(this._title){
            this._title.value = title;
        }
        if(this._lblTitle){
            this._lblTitle.innerText = title;
        }
    }

    public content(): string{
        if(this._content){
            return this._content.value;
        }
        return "";
    }
    public changeContent(content: string): void{
        if(this._content){
            this._content.value = content;
        }
        if(this._lblContent){
            this._lblContent.innerText = content;
        }
    }

    public reminderNoticeTime(): string{
        if(this._reminderNoticeTime){
            return this._reminderNoticeTime.value;
        }
        return "";
    }
    public changeReminderNoticeTime(reminderNoticeTime: string): void{
        if(this._reminderNoticeTime){
            this._reminderNoticeTime.value = reminderNoticeTime;
        }
    }

    public reminderRepeat(): string{
        if(this._reminderRepeat){
            return this._reminderRepeat.value;
        }
        return "";
    }
    public changeReminderRepeat(reminderRepeat: string): void{
        if(this._reminderRepeat){
            this._reminderRepeat.value = reminderRepeat;
        }
    }

    public startDate(): string{
        if(this._startDate){
            return this._startDate.value;
        }
        return "";
    }
    public startTime(): string{
        if(this._startTime){
            return this._startTime.value;
        }
        return "";
    }
    public changeStartDate(startDate: string): void{
        if(this._startDate){
            this._startDate.value = startDate;
        }
        if(this._lblStartDateTime){
            const startTime = this._startTime?.value;
            this._lblStartDateTime.innerText = `${startDate} ${startTime}`
        }
    }
    public changeStartTime(startTime: string): void{
        if(this._startTime){
            this._startTime.value = startTime;
        }
        if(this._lblStartDateTime){
            const startDate = this._startDate?.value;
            this._lblStartDateTime.innerText = `${startDate} ${startTime}`
        }
    }


    public checklistStatus(): string[]{
        return this._checklist?.checklistStatus() || [""];
    }
    public checklistContent(): string[]{
        return this._checklist?.checklistContent() || [""];
    }
    public isExistsAnyCheckItem(): boolean{
        return this._checklist?.isExistsAnyCheckItem() || false;
    }
	




    public createUserId(): string{
        if(this._createUserId){
            return this._createUserId.value;
        }
        return "";
    }
    public createUserName(): string{
        if(this._createUserName){
            return this._createUserName.value;
        }
        return "";
    }
    public createDatetime(): string{
        if(this._createDatetime){
            return this._createDatetime.value;
        }
        return "";
    }
    public updateUserId(): string{
        if(this._updateUserId){
            return this._updateUserId.value;
        }
        return "";
    }
    public updateUserName(): string{
        if(this._updateUserName){
            return this._updateUserName.value;
        }
        return "";
    }
    public updateDatetime(): string{
        if(this._updateDatetime){
            return this._updateDatetime.value;
        }
        return "";
    }
}