/**
 *DOM要素が読み込み完了だったらOKな処理
 */
window.addEventListener("DOMContentLoaded",function(){
	HEADER.init();
	HEADER.configureSubmitEvent();
}, false);

/**
 * header画面上で保持するオブジェクト
 */
const HEADER = {

	// 初期化処理
	init: function(){

	},
	// リクエスト送信イベントの定義処理
	configureSubmitEvent: function(){
		// ボタン-URL定義
		// 各ボタンのIDに対して、リクエスト先のURL文字列を定義する
		const requestMap = {

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





};
