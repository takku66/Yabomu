/**
 *DOM要素が読み込み完了だったらOKな処理
 */
window.addEventListener("DOMContentLoaded",function(){
	TODO.init();
	EDIT_TODO_AREA.init();
	MESSAGE_AREA.init();
}, false);

/**
 * todo画面上で保持するオブジェクト
 */
const TODO = {
	editTodoArea: null,
	btnOpenNewTodo: null,
	filter: null,
	todolist: [],
	stompClient: null,

	// 初期化処理
	init: function(){
		this.editTodoArea = document.getElementById("edit-todo-area");
		this.btnOpenNewTodo = document.getElementById("btn-open-new-todo");
		this.filter = document.getElementById("edit-todo-filter");
		this.todolist = document.getElementsByClassName("todo-box");
		this.configureEventOpenNewTodo();
		this.configureEventOpenEditTodo();
		this.configureStopClickPropagation();
		this.connectWebSocket();
	},
	configureEventOpenNewTodo: function(){
		this.btnOpenNewTodo.addEventListener("click", function(){
			TODO.openTodoArea();
		}, false);
	},
	configureEventOpenEditTodo: function(){
		for(let elm of this.todolist){
			elm.addEventListener("click", function(){
				EDIT_TODO_AREA.eventIdElm.value = elm.querySelector(".event-id").value;
				EDIT_TODO_AREA.todoIdElm.value = elm.querySelector(".todo-id").value;
				EDIT_TODO_AREA.titleElm.value = elm.querySelector(".text.title").value;
				EDIT_TODO_AREA.contentElm.value= elm.querySelector(".text.content").value;
				EDIT_TODO_AREA.reminderNoticeTimeElm.value= elm.querySelector(".select.reminder-notice-time").value;
				EDIT_TODO_AREA.reminderRepeatElm.value= elm.querySelector(".select.reminder-repeat").value;
				EDIT_TODO_AREA.startDateElm.value= elm.querySelector(".text.todo-start-date").value;
				EDIT_TODO_AREA.startTimeElm.value= elm.querySelector(".text.todo-start-time").value;
				EDIT_TODO_AREA.createUserIdElm.value= elm.querySelector(".hid.todo-create-user-id").value;
				EDIT_TODO_AREA.createUserNameElm.value= elm.querySelector(".hid.todo-create-user-name").value;
				EDIT_TODO_AREA.createDatetimeElm.value= elm.querySelector(".hid.todo-create-datetime").value;
				EDIT_TODO_AREA.updateUserIdElm.value= elm.querySelector(".hid.todo-update-user-id").value;
				EDIT_TODO_AREA.updateUserNameElm.value= elm.querySelector(".hid.todo-update-user-name").value;
				EDIT_TODO_AREA.updateDatetimeElm.value= elm.querySelector(".hid.todo-update-datetime").value;
				const checklist = elm.querySelectorAll("ul.checklist li");
				for(let checkItem of checklist){
					EDIT_TODO_AREA.checklistArea.appendChild(checkItem.cloneNode(true));
				}
				EDIT_TODO_AREA.configureEventDeleteCheckItemBtn();
				TODO.openTodoArea();
			}, false);
		}
	},
	configureEventSaveTodo: function(){

	},
	configureStopClickPropagation: function(){

		let stopSelectors = [".todo-box .select.reminder-notice-time",
							".todo-box .select.reminder-repeat",
							".todo-box .checklist li",
							".btn-save-todolist",
							".todo-box .todo-controle"];
		let stopElms = [];
		for(let selector of stopSelectors){
			Array.prototype.push.apply(stopElms, document.querySelectorAll(selector));
//			stopElms = stopElms.concat(document.querySelectorAll(selector));
		}
		for(let elm of stopElms){
			this.stopClickPropagation(elm);
		}
	},
	stopClickPropagation: function(elm){
		if(!elm){
			return false;
		}
		elm.addEventListener("click", function(e){
			e.stopPropagation();
		}, false);
	},
	openTodoArea: function(){
		TODO.filter.classList.add("active");
		TODO.editTodoArea.classList.add("active");
	},
	closeTodoArea: function(){
		TODO.filter.classList.remove("active");
		TODO.editTodoArea.classList.remove("active");
	},
	connectWebSocket: function(){
		let socket = new SockJS("/ws-stomp");
		stompClient = Stomp.over(socket);
		stompClient.connect({}, function(frame){
			console.log("Connected:" + frame);
			stompClient.subscribe("/sub/todolist/eventId/save", function(data){
				console.log("receive data:" + JSON.parse(data.body).content);
				MESSAGE_AREA.pushMessage("receive data:" + JSON.parse(data.body).content, 3000);
			})
		});
	},
	disconnectWebSocket: function(){
		if(stompClient !== null){
			stompClient.disconnect();
		}
	},
};

const EDIT_TODO_AREA = {
	// エリア本体
	areaElm: null,
	// 各入力要素
	eventIdElm: null,
	todoIdElm: null,
	titleElm: null,
	contentElm: null,
	checklistArea: null,
	reminderNoticeTimeElm: null,
	reminderRepeatElm: null,
	startDateElm: null,
	startTimeElm: null,
	// チェックリストのテンプレート要素
	checklistTemplate: null,
	// 追加ボタン
	addCheckBoxBtn: null,
	// 保存ボタン
	saveTodoBtn: null,
	// キャンセルボタン
	cancelBtn: null,
	// 作成情報
	createUserIdElm: null,
	createUserNameElm: null,
	createDatetimeElm: null,
	// 更新情報
	updateUserIdElm: null,
	updateUserNameElm: null,
	updateDatetimeElm: null,
	// リクエストパラメータ用データ
	json: {},
	// 初期化処理
	init: function(){
		this.eventIdElm = document.getElementById("hid-edit-event-id");
		this.todoIdElm = document.getElementById("hid-edit-todo-id");
		this.createUserIdElm = document.getElementById("hid-edit-create-user-id");
		this.createUserNameElm = document.getElementById("hid-edit-create-user-name");
		this.createDatetimeElm = document.getElementById("hid-edit-create-datetime");
		this.updateUserIdElm = document.getElementById("hid-edit-update-user-id");
		this.updateUserNameElm = document.getElementById("hid-edit-update-user-name");
		this.updateDatetimeElm = document.getElementById("hid-edit-update-datetime");
		this.areaElm = document.getElementById("edit-todo-area");
		this.titleElm = document.getElementById("txt-edit-todo-title");
		this.contentElm = document.getElementById("txta-edit-todo-content");
		this.checklistArea = document.querySelector("#checklist-area ul.checklist");
		this.addCheckBoxBtn = document.getElementById("btn-add-checklist");
		this.reminderNoticeTimeElm = document.getElementById("slct-edit-reminder-notice-time");
		this.reminderRepeatElm = document.getElementById("slct-edit-reminder-repeat");
		this.startDateElm = document.getElementById("txt-edit-start-date");
		this.startTimeElm = document.getElementById("txt-edit-start-time");
		this.saveTodoBtn = document.getElementById("btn-save-todo");
		this.cancelBtn = document.getElementById("btn-cancel-todo");
		this.checklistTemplate = this.createTemplateCheckItem();
		this.configureEventTodoAreaBtn();
	},
	// 各ボタンのイベントを定義する
	configureEventTodoAreaBtn: function(){
		// 追加ボタンクリック時は、チェックボックス要素を追加する
		this.addCheckBoxBtn.addEventListener("click", function(){
			const cloneCheckItem = this.checklistTemplate.cloneNode(true);
			this.checklistArea.appendChild(cloneCheckItem);
			const delBtn = cloneCheckItem.querySelector(".delete-btn-checklist");
			this.applyEventDeleteCheckItem(delBtn);
		}.bind(EDIT_TODO_AREA), false);

		// 保存ボタンクリック時は、現在編集中のTODOリストの内容をサーバーに送信して、TODOリストに反映させる
		this.saveTodoBtn.addEventListener("click", function(){
			const json = this.createJson();
			const url = "/pub/todolist/" + this.todoIdElm.value + "/save";
			stompClient.send(url, {}, JSON.stringify(json));
			//this.sendTodoJson();
		}.bind(EDIT_TODO_AREA), false);

		// キャンセルボタンクリック時は、現在編集中の内容を破棄して閉じる
		this.cancelBtn.addEventListener("click", function(){
			TODO.closeTodoArea();
			this.resetEditContent();
		}.bind(EDIT_TODO_AREA), false);


	},
	sendTodoJson: function(){
		const json = this.createJson();
		console.log(json);
		const csrfHeader = document.querySelector('meta[name="_csrf_header"]').content;
		const token = document.querySelector('meta[name="_csrf"]').content;
		const todoId = json.todoId;
		fetch(`/todolist/${todoId}/save`,{
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
			MESSAGE_AREA.pushMessage(`${data.message}`, 10000);
		}).catch((reason)=>{
			console.log(reason);
		});
	},

	// チェックアイテム横にある、削除ボタンのイベントを定義する
	configureEventDeleteCheckItemBtn: function(){
		const checkItemDeleteBtns = this.checklistArea.querySelectorAll(".delete-btn-checklist");
		for(let btn of checkItemDeleteBtns){
			this.applyEventDeleteCheckItem(btn);
		}
	},
	applyEventDeleteCheckItem: function(elm){
		elm.addEventListener("click", function(){
			let delElm = findParent(this, "li");
			delElm.remove();
		}, false);
	},
	resetEditContent: function(){
		this.eventIdElm.value = "";
		this.todoIdElm.value = "";
		this.titleElm.value = "";
		this.contentElm.value= "";
		while(this.checklistArea.firstChild){
			this.checklistArea.removeChild(this.checklistArea.firstChild);
		}
		this.createUserIdElm.value = "";
		this.createUserNameElm.value = "";
		this.createDatetimeElm.value = "";
		this.updateUserIdElm.value = "";
		this.updateUserNameElm.value = "";
		this.updateDatetimeElm.value = "";
		this.reminderNoticeTimeElm.value = "";
		this.reminderRepeatElm.value = "";
		this.startDateElm.value = "";
		this.startTimeElm.value = "";
	},
	// チェックリストのテンプレート要素を作成する
	createTemplateCheckItem: function(){
		const li = document.createElement("li");
		const label1 = document.createElement("label");
		const label2 = document.createElement("label");
		const textNode = document.createTextNode("\r\n");
		const span = document.createElement("span");
		span.classList = "label";
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
		li.appendChild(label1);
		li.appendChild(textNode.cloneNode(true));
		li.appendChild(label2);
		return li;
	},
	createJson: function(){
		json = {
			eventId:	this.eventIdElm.value,
			todoId:		this.todoIdElm.value,
			title:		this.titleElm.value,
			content:	this.contentElm.value,
			checkList:	this.collectCheckItems(EDIT_TODO_AREA.areaElm),
			todoStartDate:this.startDateElm.value,
			todoStartTime:this.startTimeElm.value,
			todoEndDateTime: null, // TODO:未実装
			reminderRepeat: this.reminderRepeatElm.value,
			reminderNoticeTime: this.reminderNoticeTimeElm.value,
			createUserId: this.createUserIdElm.value,
			createUserName: this.createUserNameElm.value,
			createDatetime: this.createDatetimeElm.value,
			updateUserId: this.updateUserIdElm.value,
			updateUserName: this.updateUserNameElm.value,
			updateDatetime: this.updateDatetimeElm.value
		};
		return json;
	},
	// チェックリストの配列を返す。配列内の要素はJson形式
	collectCheckItems: function(todoArea){
		const checklist = todoArea.querySelectorAll("ul.checklist li");
		let maxSeq = 0;
		const jsons = [];
		const newCheckItems = [];

		// 全チェックリストの処理
		for(let checkItem of checklist){
			const checkItemEventId = todoArea.querySelector(".event-id").value;
			const checkItemTodoId = todoArea.querySelector(".todo-id").value;
			const checkItemStatus = checkItem.querySelector(".checklist.checkbox.status").value;
			const checkItemContent = checkItem.querySelector(".checklist.text").value;

			// 新規で作成されたチェックリストは、後で処理するための配列に入れておく
			if(!checkItem.querySelector(".checklist.seq")){
				newCheckItems.push(checkItem);
				continue;
			}
			const checkItemSeq = checkItem.querySelector(".checklist.seq").value;
			if(maxSeq < checkItemSeq){
				maxSeq = checkItemSeq;
			}
			jsons.push({
				eventId: checkItemEventId,
				todoId: checkItemTodoId,
				seq: checkItemSeq,
				status: checkItemStatus,
				content: checkItemContent
			});
		}
		// 新しく生成されたチェックリストの処理
		for(let newCheckItem of newCheckItems){
			const checkItemEventId = todoArea.querySelector(".event-id").value;
			const checkItemTodoId = todoArea.querySelector(".todo-id").value;
			const checkItemSeq = ++maxSeq;
			const checkItemStatus = newCheckItem.querySelector(".checklist.checkbox.status").checked;
			const checkItemContent = newCheckItem.querySelector(".checklist.text").value;
			jsons.push({
				eventId: checkItemEventId,
				todoId: checkItemTodoId,
				seq: checkItemSeq,
				status: checkItemStatus,
				content: checkItemContent
			});
		}
		return jsons;
	},
	isNew: function(){

	}
};

const MESSAGE_AREA = {
	elm: null,
	messageList: null,
	templateMsgItem: null,
	init: function(){
		this.elm = document.getElementById("message-area");
		this.messageList = document.getElementById("message-list");
		this.templateMsgItem = this.createTemplateMsgItem();
	},
	createTemplateMsgItem: function(){
		const li = document.createElement("li");
		li.classList.add("message");
		const div = document.createElement("div");
		div.classList.add("content");
		const delBtn = document.createElement("button");
		delBtn.type="button";
		delBtn.classList.add("delete-btn-message");
		delBtn.innerText = "×";

		li.appendChild(delBtn);
		li.appendChild(div);
		return li;
	},
	pushMessage: function(message, expireTime){
		const msg = this.templateMsgItem.cloneNode(true);
		msg.querySelector(".content").innerHTML = message;
		this.messageList.appendChild(msg);
		setTimeout(function(){
				this.hideMessage(msg)
		}.bind(MESSAGE_AREA), expireTime);
	},
	applyEventDeleteMessage: function(delBtn){
		delBtn.addEventListener("click", function(){
			const li = findParent(delBtn, "li");
			li.remove();
		}, false);
	},
	hideMessage: function(msgElm){
		msgElm.classList.add("hide");
	}
};

function findParent(elm, tagName){
	if(!tagName){ return false; }
	let parent = elm;
	for(let i = 0; i < 10; i++){
		parent = parent.parentNode;
		if(parent.tagName == tagName.toUpperCase()){
			return parent;
		}
	}
	return false;
}
