/**
 *DOM要素が読み込み完了だったらOKな処理
 */
window.addEventListener("DOMContentLoaded",function(){
	HOME.init();
	HOME.configureSubmitEvent();
	HOME.CALENDAR.configureEvent();
}, false);

/**
 * home画面上で保持するオブジェクト
 */
const HOME = {

	// 初期化処理
	init: function(){
		this.calendarArea = document.getElementById("calendar-area");
		this.CALENDAR.create();
	},
	// リクエスト送信イベントの定義処理
	configureSubmitEvent: function(){
		// ボタン-URL定義
		// 各ボタンのIDに対して、リクエスト先のURL文字列を定義する
		const requestMap = {
			"album_slideshow":{ url: "/album/edit",
								nav: "album"
			},
			"btn-edit_todolist":{ url: "/todolist/edit",
								  nav: "todolist"
			},
			"btn-edit_schedule":{ url: "/schedule/edit",
								  nav: "schedule"
			}
		}

		// 各ボタンに、submit用のイベントを付与する
		for(let elm of Object.keys(requestMap)){
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

	CALENDAR: {
		calendar: null,
		calendarArea: null,
		// カレンダー周りのイベント定義
		configureEvent: function(){
			const prevBtn = document.getElementById("btn-prev_month");
			const nextBtn = document.getElementById("btn-next_month");

			prevBtn.addEventListener("click", function(){
				HOME.CALENDAR.previous();
			});
			nextBtn.addEventListener("click", function(){
				HOME.CALENDAR.next();
			});
		},

		create: function(){
			HOME.CALENDAR.calendar = YbmCalendar.create("calendar-area");
		},
		previous: function(){
			HOME.CALENDAR.calendar.prev();
		},
		next: function(){
			HOME.CALENDAR.calendar.next();
		},
		move: function(year, month){
			HOME.CALENDAR.calendar.move(year, month);
		}

	}





};
