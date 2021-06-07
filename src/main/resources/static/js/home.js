/**
 *DOM要素が読み込み完了だったらOKな処理
 */
window.addEventListener("DOMContentLoaded",function(){
	init();
}, false);

/**
 * 初期化処理
 * @returns
 */
function init(){
	configureSubmitEvent();
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
		"btn-add_album":"/album/add",
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
