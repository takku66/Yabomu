/**
 *DOM要素が読み込み完了だったらOKな処理
 */
window.addEventListener("DOMContentLoaded",function(){
	TODO.init();
}, false);

/**
 * todo画面上で保持するオブジェクト
 */
const TODO = {
	editTodoArea: null,
	btnOpenNewTodo: null,
	filter: null,
	todolist: [],

	// 初期化処理
	init: function(){
		this.editTodoArea = document.getElementById("edit-todo-area");
		this.btnOpenNewTodo = document.getElementById("btn-open-new-todo");
		this.filter = document.getElementById("edit-todo-filter");
		this.todolist = document.getElementsByClassName("todo-box");
		this.configureSubmitEvent();
		this.configureOpenNewTodoEvent();
		this.configureOpenEditTodoEvent();
		this.configureStopClickPropagation();
		this.EDIT_TODO_AREA.init();
	},
	// リクエスト送信イベントの定義処理
	configureSubmitEvent: function(){
		// ボタン-URL定義
		// 各ボタンのIDに対して、リクエスト先のURL文字列を定義する
		const requestMap = {
//			"btn-edit_schedule":{ url: "/schedule/edit",
//								  nav: "schedule"
//			}
		}

		// 各ボタンに、submit用のイベントを付与する
		for(let elm in Object.keys(requestMap)){
			const btn = document.getElementById(elm);
			btn.addEventListener("click", function(){
				NAV.activateMenuId(requestMap[elm].nav);
				const form = document.mainForm;
				form.method = "post";
				form.action = requestMap[elm].url;
				form.submit();
			}, false);
		}
	},
	configureOpenNewTodoEvent: function(){
		this.btnOpenNewTodo.addEventListener("click", function(){
			TODO.openTodoArea();
		}, false);
	},
	configureOpenEditTodoEvent: function(){
		for(let elm of this.todolist){
			elm.addEventListener("click", function(){
				TODO.EDIT_TODO_AREA.idElm.value = elm.querySelector(".todo-id").value;
				TODO.EDIT_TODO_AREA.titleElm.value = elm.querySelector(".text.title").value;
				TODO.EDIT_TODO_AREA.contentElm.value= elm.querySelector(".text.content").value;
				TODO.EDIT_TODO_AREA.reminderTimeElm.value= elm.querySelector(".select.reminder-time").value;
				TODO.EDIT_TODO_AREA.reminderRepeatElm.value= elm.querySelector(".select.reminder-repeat").value;
				TODO.EDIT_TODO_AREA.startDateTimeElm.value= elm.querySelector(".text.todo-start-datetime").value;
				const checklist = elm.querySelectorAll("ul.checklist li");
				for(let checkItem of checklist){
					TODO.EDIT_TODO_AREA.checklistArea.appendChild(checkItem.cloneNode(true));
				}
				TODO.EDIT_TODO_AREA.configureDeleteCheckItemBtnEvent();
				TODO.openTodoArea();
			}, false);
		}
	},
	configureSaveTodoEvent: function(){

	},
	configureStopClickPropagation: function(){

		let stopSelectors = [".todo-box .select.reminder-time",
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
	EDIT_TODO_AREA: {
		// エリア本体
		areaElm: null,
		// 各入力要素
		idElm: null,
		titleElm: null,
		contentElm: null,
		checklistArea: null,
		checklistTemplate: null,
		reminderTimeElm: null,
		reminderRepeatElm: null,
		startDateTimeElm: null,
		// 追加ボタン
		addCheckBoxBtn: null,
		// 保存ボタン
		saveTodoBtn: null,
		// キャンセルボタン
		cancelBtn: null,
		// 初期化処理
		init: function(){
			this.idElm = document.getElementById("hid-edit-todo-id");
			this.areaElm = document.getElementById("edit-todo-area");
			this.titleElm = document.getElementById("txt-edit-todo-title");
			this.contentElm = document.getElementById("txta-edit-todo-content");
			this.checklistArea = document.querySelector("#checklist-area ul.checklist");
			this.addCheckBoxBtn = document.getElementById("btn-add-checklist");
			this.reminderTimeElm = document.getElementById("slct-edit-reminder-time");
			this.reminderRepeatElm = document.getElementById("slct-edit-reminder-repeat");
			this.startDateTimeElm = document.getElementById("txt-edit-start-datetime");
			this.saveTodoBtn = document.getElementById("btn-save-todo");
			this.cancelBtn = document.getElementById("btn-cancel-todo");
			this.checklistTemplate = this.createTemplateCheckItem();
			this.configureTodoAreaBtnEvent();
		},
		// 各ボタンのイベントを付与する
		configureTodoAreaBtnEvent: function(){
			// 追加ボタンクリック時は、チェックボックス要素を追加する
			this.addCheckBoxBtn.addEventListener("click", function(){
				const cloneCheckItem = this.checklistTemplate.cloneNode(true);
				this.checklistArea.appendChild(cloneCheckItem);
				const delBtn = cloneCheckItem.querySelector(".delete-btn-checklist");
				this.applyDeleteCheckItemEvent(delBtn);
			}.bind(TODO.EDIT_TODO_AREA), false);

			// 保存ボタンクリック時は、現在編集中のTODOリストの内容をサーバーに送信して、TODOリストに反映させる
			this.saveTodoBtn.addEventListener("click", function(){

			}.bind(TODO.EDIT_TODO_AREA), false);

			// キャンセルボタンクリック時は、現在編集中の内容を破棄して閉じる
			this.cancelBtn.addEventListener("click", function(){
				TODO.closeTodoArea();
				this.resetEditContent();
			}.bind(TODO.EDIT_TODO_AREA), false);
		},
		configureDeleteCheckItemBtnEvent: function(){
			const checkItemDeleteBtns = this.checklistArea.querySelectorAll(".delete-btn-checklist");
			for(let btn of checkItemDeleteBtns){
				this.applyDeleteCheckItemEvent(btn);
			}
		},
		applyDeleteCheckItemEvent: function(elm){
			elm.addEventListener("click", function(){
				let delElm = findParent(this, "li");
				delElm.parentNode.removeChild(delElm);
			}, false);
		},
		resetEditContent: function(){
			this.idElm.value = "";
			this.titleElm.value = "";
			this.contentElm.value= "";
			while(this.checklistArea.firstChild){
				this.checklistArea.removeChild(this.checklistArea.firstChild);
			}
		},
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
		}
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
