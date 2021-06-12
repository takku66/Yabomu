/**
 *DOM要素が読み込み完了だったらOKな処理
 */
window.addEventListener("DOMContentLoaded",function(){
	init();
}, false);

/**
 * home画面上で保持するグローバルオブジェクト
 */
const HOME = {
	calendar: null
};


/**
 * 初期化処理
 * @returns
 */
function init(){
	configureSubmitEvent();
	createCalendar();
}

/**
 * リクエスト送信イベントの定義処理
 * @returns
 */
function configureSubmitEvent(){

	// ボタン-URL定義
	// 各ボタンのIDに対して、リクエスト先のURL文字列を定義する
	const requestMap = {
		"btn-add_plan":"/plan/add",
		"btn-edit_todolist":"/todolist/edit"
	}

	// 各ボタンに、submit用のイベントを付与する
	for(let elm of Object.keys(requestMap)){
		const btn = document.getElementById(elm);
		btn.addEventListener("click", function(){
			const form = document.mainForm;
			form.method = "post";
			form.action = requestMap[elm];
			form.submit();
		}, false);
	}
}

function createCalendar(){
	HOME.calendar = YbmCalendar.create("calendar_area");
}
