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
		this.editTodoArea = document.getElementById("edit_todo-area");
		this.btnOpenNewTodo = document.getElementById("btn-open_new_todo");
		this.filter = document.getElementById("edit_todo-filter");
		this.todolist = document.getElementsByClassName("todo-box");
		this.configureSubmitEvent();
		this.configureOpenNewTodoEvent();
		this.configureOpenEditTodoEvent();
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
				TODO.EDIT_TODO_AREA.titleElm.value = elm.querySelector(".text.title").value;
				TODO.EDIT_TODO_AREA.contentElm.value= elm.querySelector(".text.content").value;

				TODO.openTodoArea();
			}, false);
		}

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
		// 各入力要素
		titleElm: null,
		contentElm: null,
		checklistArea: null,
		checklistElms: [],
		// 追加ボタン
		addCheckBoxBtn: null,
		// 保存ボタン
		saveTodoBtn: null,
		// キャンセルボタン
		cancelBtn: null,
		// 初期化処理
		init: function(){
			this.titleElm = document.getElementById("todo_title");
			this.contentElm = document.getElementById("todo_content");
			this.checklistArea = document.getElementById("checklist-area");
			this.checklistElms = this.checklistArea.getElementsByClassName("checklist");
			this.addCheckBoxBtn = document.getElementById("btn-add_checklist");
			this.saveTodoBtn = document.getElementById("btn-save_todo");
			this.cancelBtn = document.getElementById("btn-newtodo_cancel");
			this.configureTodoAreaBtn();
		},
		// 各ボタンのイベントを付与する
		configureTodoAreaBtn: function(){
			// 追加ボタンクリック時は、チェックボックス要素を追加する
			this.addCheckBoxBtn.addEventListener("click", function(){

			}, false);

			// 保存ボタンクリック時は、現在編集中のTODOリストの内容をサーバーに送信して、TODOリストに反映させる
			this.saveTodoBtn.addEventListener("click", function(){

			}, false);

			// キャンセルボタンクリック時は、現在編集中の内容を破棄して閉じる
			this.cancelBtn.addEventListener("click", function(){
				TODO.closeTodoArea();
			}, false);
		}
	}

};
