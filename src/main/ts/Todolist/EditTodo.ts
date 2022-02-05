import * as util from "../Common";
import { TodoView, TODO } from "./TodoView";
import { ICheckItemData } from "./ICheckItemData";
import { ITodoData } from "./ITodoData";
import { TodoMediator } from "./TodoMediator";

export interface IEditTodoAdp {
	closeTodo(): void;
	saveTodo(url: string, json:string): void;
}

export class EditTodo {
	// エリア本体
	_areaElm: HTMLElement;
	// 各入力要素
	_eventIdElm: HTMLInputElement;
	_todoIdElm: HTMLInputElement;
	_titleElm: HTMLInputElement;
	_contentElm: HTMLInputElement;
	_checklistArea: HTMLInputElement;
	_reminderNoticeTimeElm: HTMLInputElement;
	_reminderRepeatElm: HTMLInputElement;
	_startDateElm: HTMLInputElement;
	_startTimeElm: HTMLInputElement;
	// チェックリストのテンプレート要素
	_checklistTemplate: HTMLElement;
	// エリア下部のボタン
	_addCheckBoxBtn: HTMLElement;
	_saveTodoBtn: HTMLElement;
	_cancelBtn: HTMLElement;
	// 作成情報
	_createUserIdElm: HTMLInputElement;
	_createUserNameElm: HTMLInputElement;
	_createDatetimeElm: HTMLInputElement;
	// 更新情報
	_updateUserIdElm: HTMLInputElement;
	_updateUserNameElm: HTMLInputElement;
	_updateDatetimeElm: HTMLInputElement;
	
	// 初期化処理
	constructor(){
		this._eventIdElm = <HTMLInputElement>document.getElementById("hid-edit-event-id");
		this._todoIdElm = <HTMLInputElement>document.getElementById("hid-edit-todo-id");
		this._createUserIdElm = <HTMLInputElement>document.getElementById("hid-edit-create-user-id");
		this._createUserNameElm = <HTMLInputElement>document.getElementById("hid-edit-create-user-name");
		this._createDatetimeElm = <HTMLInputElement>document.getElementById("hid-edit-create-datetime");
		this._updateUserIdElm = <HTMLInputElement>document.getElementById("hid-edit-update-user-id");
		this._updateUserNameElm = <HTMLInputElement>document.getElementById("hid-edit-update-user-name");
		this._updateDatetimeElm = <HTMLInputElement>document.getElementById("hid-edit-update-datetime");

		this._areaElm = <HTMLElement>document.getElementById("edit-todo-area");
		this._titleElm = <HTMLInputElement>document.getElementById("txt-edit-todo-title");
		this._contentElm = <HTMLInputElement>document.getElementById("txta-edit-todo-content");
		this._checklistArea = <HTMLInputElement>document.querySelector<HTMLInputElement>("#checklist-area ul.checklist");
		this._addCheckBoxBtn = <HTMLElement>document.getElementById("btn-add-checklist");
		this._reminderNoticeTimeElm = <HTMLInputElement>document.getElementById("slct-edit-reminder-notice-time");
		this._reminderRepeatElm = <HTMLInputElement>document.getElementById("slct-edit-reminder-repeat");
		this._startDateElm = <HTMLInputElement>document.getElementById("txt-edit-start-date");
		this._startTimeElm = <HTMLInputElement>document.getElementById("txt-edit-start-time");
		this._saveTodoBtn = <HTMLElement>document.getElementById("btn-save-todo");
		this._cancelBtn = <HTMLElement>document.getElementById("btn-cancel-todo");
		this._checklistTemplate = <HTMLElement>this.createTemplateCheckItem();
		this._addEventAddCheckList();
		this._addEventSave();
		this._addEventCancel();
	}
	setUpEditCard(elm:Element | ""){
		this._eventIdElm.value = document.querySelector<HTMLInputElement>(".choose-event.select")?.value || "";
		if(!this._eventIdElm.value){throw new Error("イベントIDがありません。");}
		if(elm !== ""){
			this._copyToEditCard(elm);
		}
		this._addEventDeleteCheckItemBtn();
	}
	private _copyToEditCard(elm:Element){		
		this._todoIdElm.value = elm.querySelector<HTMLInputElement>(".todo-id")?.value || "";
		this._titleElm.value = elm.querySelector<HTMLInputElement>(".text.title")?.value || "";
		this._contentElm.value= elm.querySelector<HTMLInputElement>(".text.content")?.value || "";
		this._reminderNoticeTimeElm.value= elm.querySelector<HTMLInputElement>(".select.reminder-notice-time")?.value || "";
		this._reminderRepeatElm.value= elm.querySelector<HTMLInputElement>(".select.reminder-repeat")?.value || "";
		this._startDateElm.value= elm.querySelector<HTMLInputElement>(".text.todo-start-date")?.value || "";
		this._startTimeElm.value= elm.querySelector<HTMLInputElement>(".text.todo-start-time")?.value || "";
		this._createUserIdElm.value= elm.querySelector<HTMLInputElement>(".hid.todo-create-user-id")?.value || "";
		this._createUserNameElm.value= elm.querySelector<HTMLInputElement>(".hid.todo-create-user-name")?.value || "";
		this._createDatetimeElm.value= elm.querySelector<HTMLInputElement>(".hid.todo-create-datetime")?.value || "";
		this._updateUserIdElm.value= elm.querySelector<HTMLInputElement>(".hid.todo-update-user-id")?.value || "";
		this._updateUserNameElm.value= elm.querySelector<HTMLInputElement>(".hid.todo-update-user-name")?.value || "";
		this._updateDatetimeElm.value= elm.querySelector<HTMLInputElement>(".hid.todo-update-datetime")?.value || "";
		const checklist = elm.querySelectorAll("ul.checklist li");
		for(let checkItem of checklist){
			this._checklistArea.appendChild(checkItem.cloneNode(true));
		}
	}
	
	clear(){
		this._eventIdElm.value = "";
		this._todoIdElm.value = "";
		this._titleElm.value = "";
		this._contentElm.value= "";
		while(this._checklistArea.firstChild){
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
	private _addEventAddCheckList(){
		// 追加ボタンクリック時は、チェックボックス要素を追加する
		this._addCheckBoxBtn.addEventListener("click", () => {
			const cloneCheckItem = <HTMLElement>this._checklistTemplate.cloneNode(true);
			this._checklistArea.appendChild(cloneCheckItem);
			const delBtn = cloneCheckItem.querySelector<HTMLElement>(".delete-btn-checklist");
			if(delBtn === null) return;
			this._applyEventDeleteCheckItem(delBtn);
		}, false);
	}
	private _addEventSave(){
		// 保存ボタンクリック時は、現在編集中のTODOリストの内容をサーバーに送信して、TODOリストに反映させる
		this._saveTodoBtn.addEventListener("click", () => {
			// const json = this.createJson();
			// const url = "/pub/todolist/" + this._todoIdElm.value + "/save";
			// TODO.mediator.saveTodo(url, JSON.stringify(json));
			// this._stompClient.send(url, {}, JSON.stringify(json));
			this.sendTodoJson();
		}, false);
	}
	private _addEventCancel(){
		// キャンセルボタンクリック時は、現在編集中の内容を破棄して閉じる
		this._cancelBtn.addEventListener("click", () => {
			TODO.mediator.closeTodo();
		}, false);
	}
	public sendTodoJson(){
		const json = this.createJson();
		console.log(json);
		const csrfHeader = document.querySelector<HTMLMetaElement>('meta[name="_csrf_header"]')?.content || "";
		const token = document.querySelector<HTMLMetaElement>('meta[name="_csrf"]')?.content || "";
		const todoId = json.todoId;
		// デフォルトは登録用の処理
		let url = `/todolist/save`;
		if(todoId){
			url = `/todolist/${todoId}/save`
		}
		fetch(url,{
	//			credentials: "same-origin",
			method: "POST",
			headers: {
				"charset"		: "UTF-8",
				"Content-Type"	: "application/json",
				[csrfHeader]	: token,
			},
			body: JSON.stringify(json)
		}).then((res)=>{
			if(!res.ok){
				throw new Error(`${res.status}${res.statusText}`);
			}
			console.log(res);
			return res.json();
		}).then((data)=>{
			console.log(data);
			TODO.mediator.pushMessage(`${data.message}`, 10000);
		}).catch((reason)=>{
			console.log(reason);
		});
	}

	// チェックアイテム横にある、削除ボタンのイベントを定義する
	private _addEventDeleteCheckItemBtn(){
		const checkItemDeleteBtns = this._checklistArea.querySelectorAll<HTMLElement>(".delete-btn-checklist");
		for(let btn of checkItemDeleteBtns){
			this._applyEventDeleteCheckItem(btn);
		}
	}
	private _applyEventDeleteCheckItem(elm: HTMLElement){
		elm.addEventListener("click", () => {
			let delElm = <HTMLElement>util.findParent(elm, "li");
			if(delElm === null) return;
			delElm.remove();
		}, false);
	}
	
	// チェックリストのテンプレート要素を作成する
	createTemplateCheckItem(): HTMLElement{
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
		text.type="text";
		text.classList.add("checklist");
		text.classList.add("text");
		text.placeholder = "◯◯を買う。";
		const delBtn = document.createElement("button");
		delBtn.type="button";
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
	public createJson(): ITodoData{
		const json:ITodoData = {
			eventId:	this._eventIdElm.value,
			todoId:		this._todoIdElm.value,
			title:		this._titleElm.value,
			content:	this._contentElm.value,
			checkList:	this.collectCheckItems(this._areaElm),
			todoStartDate:this._startDateElm.value,
			todoStartTime:this._startTimeElm.value,
			todoEndDateTime: "", // TODO:未実装
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
	collectCheckItems(todoArea: HTMLElement): Array<ICheckItemData>{
		if(todoArea === null) return new Array<ICheckItemData>();
		const checklist = todoArea.querySelectorAll<HTMLElement>("ul.checklist li");
		let maxSeq = 0;
		const jsons = new Array<ICheckItemData>();
		const newCheckItems = new Array<HTMLElement>();

		// 全チェックリストの処理
		for(let checkItem of checklist){
			const checkItemEventId = todoArea.querySelector<HTMLInputElement>(".event-id")?.value || "";
			const checkItemTodoId = todoArea.querySelector<HTMLInputElement>(".todo-id")?.value || "";
			const checkItemStatus = checkItem.querySelector<HTMLInputElement>(".checklist.checkbox.status")?.value || "";
			const checkItemContent = checkItem.querySelector<HTMLInputElement>(".checklist.text")?.value || "";

			const checkItemSeq = checkItem.querySelector<HTMLInputElement>(".checklist.seq")?.value || "";
			// 新規で作成されたチェックリストは、後で処理するための配列に入れておく
			if(!checkItemSeq){
				newCheckItems.push(checkItem);
				continue;
			}
			const numCheckItemSeq = parseInt(checkItemSeq);
			if(maxSeq < numCheckItemSeq){
				maxSeq = numCheckItemSeq;
			}
			jsons.push({
				eventId: checkItemEventId,
				todoId: checkItemTodoId,
				seq: numCheckItemSeq,
				completed: String(checkItemStatus)==="on" ? "true" : "false",
				content: checkItemContent
			});
		}
		// 新しく生成されたチェックリストの処理
		for(let newCheckItem of newCheckItems){
			const checkItemEventId = todoArea.querySelector<HTMLInputElement>(".event-id")?.value || "";
			const checkItemTodoId = todoArea.querySelector<HTMLInputElement>(".todo-id")?.value || "";
			const checkItemSeq = ++maxSeq;
			const checkItemStatus = newCheckItem.querySelector<HTMLInputElement>(".checklist.checkbox.status")?.checked || false;
			const checkItemContent = newCheckItem.querySelector<HTMLInputElement>(".checklist.text")?.value || "";
			jsons.push({
				eventId: checkItemEventId,
				todoId: checkItemTodoId,
				seq: checkItemSeq,
				completed: String(checkItemStatus)==="on" ? "true" : "false",
				content: checkItemContent
			});
		}
		return jsons;
	}
	public isNew(): boolean{
		return !(this._todoIdElm.value);
	}
}
