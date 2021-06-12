'use strict'

var YbmCalendar = YbmCalendar || {};

(function(){
	const _cal = YbmCalendar;

	// カレンダーを表示するidと日付を指定
	// idは必須、デフォルトは今日日付
	_cal.calendar = function(id, year, month, date){
		this.id = id;
		this.year = year;
		this.month = month;
		this.date = date;
		this.weeks = ["日", "月", "火", "水", "木", "金", "土"];
		this.startWeek = 0;
		this.displayCalendars = {};
	}
	_cal.create = function(id,
							year = (new Date()).getFullYear(),
							month = (new Date()).getMonth(),
							date = (new Date()).getDate()){

		// インスタンスを生成
		const calendar = new _cal.calendar(id, year, month, date);
		calendar.init();
		const currentDate = new Date(year, month, date);
		// 前月の最終日を取得する
		const daysInLastMonth = daysInMonthOf(year, month-1);
		// 今月の最終日を取得する
		const daysInThisMonth = daysInMonthOf(year, month);
		// 次月の最終日を取得する
		const daysInNextMonth = daysInMonthOf(year, month+1);

		// カレンダー上、前月で表示する日付の差分を取得する
		const lastMonthRemainder = (new Date(year,month,1)).getDay();


		let table = document.createElement("table");
		table.id = "table-calendar";
		table.classList.add("table-calendar");
		let headerRow = document.createElement("tr");
		let colgroup;
		let header;
		// ヘッダーを構築する
		for(let i = 0; i < 7; i++){
			colgroup = document.createElement("colgroup");
			colgroup.classList.add("day" + i);
			header = document.createElement("th");
			header.textContent = calendar.weeks[i];
			table.appendChild(colgroup);
			headerRow.appendChild(header);
		}
		table.appendChild(colgroup);
		table.appendChild(headerRow);

		// 差分があれば、前月分からHTMLを構築する
		let row = document.createElement("tr");
		let cell;
		if(lastMonthRemainder != 0){
			for(let remainder = lastMonthRemainder; remainder > 0; remainder--){
				cell = document.createElement("td");
				cell.classList.add("last-month");
				cell.textContent = daysInLastMonth - remainder;
				row.appendChild(cell);
			}
		}
		// 縦列
		let showDate = 1;
		let startDay = lastMonthRemainder;
		current_month_loop:
		for(let i = 0; i < 6; i++){
			for(let j = startDay; j < 7; j++){
				cell = document.createElement("td");
				cell.classList.add("this-month");
				cell.textContent = showDate;
				row.appendChild(cell);
				if(showDate === daysInThisMonth) {break current_month_loop;}
				showDate++;
			}
			startDay = 0;
			table.appendChild(row);
			row = document.createElement("tr");
		}
		let stockedDate = showDate + lastMonthRemainder;
		showDate = 1;
		startDay = stockedDate % 7;
		for(let i = 0, ilen = 6 - stockedDate/7; i < ilen; i++){
			for(let j = startDay; j < 7; j++){
				cell = document.createElement("td");
				cell.classList.add("next-month");
				cell.textContent = showDate;
				row.appendChild(cell);
				showDate++;
				stockedDate++;
			}
			startDay = 0;
			table.appendChild(row);
			row = document.createElement("tr");
		}


		calendar.show(table);
		calendar.displayCalendars[year][month].html = table;
		return;
	};

	_cal.calendar.prototype = {
		init: function(){
			// 取得できなかった場合は処理を中断する
			if(!document.getElementById(this.id)){
				throw new Error(`カレンダーを表示する要素の取得に失敗しました。[id=${this.id}]`);
			}


		},
		show: function(table){
			document.getElementById(this.id).appendChild(table);
		},
		prev: function(){

		},
		next: function(){

		},
		move: function(year, month){

		}
	};

})();

function daysInMonthOf(year, month){
	return 32 - (new Date(year, month, 32)).getDate();
}