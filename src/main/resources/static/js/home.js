/**
 *DOM要素が読み込み完了だったらOKな処理
 */
window.addEventListener("DOMContentLoaded",function(){
	HOME.init();
}, false);

/**
 * home画面上で保持するオブジェクト
 */
const HOME = {

	// 初期化処理
	init: function(){
		this.calendarArea = document.getElementById("calendar-area");
		this.configureSubmitEvent();
		this.CALENDAR.create();
		this.CALENDAR.configureEvent();
	},
	// リクエスト送信イベントの定義処理
	configureSubmitEvent: function(){
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
	},

	CALENDAR: {
		calendar: null,
		calendarArea: null,
		// カレンダー周りのイベント定義
		configureEvent: function(){
			const prevBtn = document.getElementById("btn-prev_month");
			const nextBtn = document.getElementById("btn-next_month");

			prevBtn.addEventListener("click", function(){
				this.previousCalendar();
			});
			nextBtn.addEventListener("click", function(){
				this.nextCalendar();
			});
		},

		create: function(){
			this.calendar = YbmCalendar.create("calendar-area");
		},
		previous: function(){
			this.calendar.prev();
		},
		next: function(){
			this.calendar.next();
		},
		move: function(year, month){
			this.calendar.move(year, month);
		}

	}





};
