'use strict'

var YbmCalendar = YbmCalendar || {};

(function(){
	const _cal = YbmCalendar;

	_cal.create = function(id,
							year = (new Date()).getFullYear(),
							month = (new Date()).getMonth(),
							date = (new Date()).getDate()){

		const calendar = new _cal.calendar(id, year, month, date);
		calendar.init();
		// 表示用のHTMLを生成する
		// tbodyはストックしておきたいため、とっておく
		const tableobj = calendar.createTable(year, month);
		this.thead = tableobj.thead;
		this.table = tableobj.table;
		this.table.classList.add("active");
		calendar.stock(year, month, tableobj.table);
		calendar.append(this.table);
		return calendar;
	};

	// カレンダーを表示するidと日付を指定
	// idは必須、デフォルトは今日日付
	_cal.calendar = function(id, year, month, date){
		this.id = id;
		this.year = year;
		this.month = month;
		this.date = date;
		this.daysOfWeek = ["日", "月", "火", "水", "木", "金", "土"];
		this.table = null;
		this.thead = null;
		this.stockCalendars = {};
		this._calDiv = null;
		this._includedGap = false;
		this.creator = {
				daysOfWeek: ["日", "月", "火", "水", "木", "金", "土"],
				beginningDay: 0,
				createThead: function(){
					let thead = document.createElement("thead");
					let headerRow = document.createElement("tr");
					let header;
					// ヘッダーを構築する
					for(let i = 0 + this.beginningDay,
							ilen = 7 + this.beginningDay; i < ilen ; i++){
						header = document.createElement("th");
						header.textContent = this.daysOfWeek[i % 7];
						headerRow.appendChild(header);
					}
					thead.appendChild(headerRow);
					return thead;
				},
				createCaption: function(year, month){
					const caption = document.createElement("caption");
					caption.textContent = `${year}年${month}月`;
					return caption;
				},
				createColgroup: function(){
					// colgroupをtableに組み込む
					const colgroup = document.createElement("colgroup");
					for(let i = 0; i < 7; i++){
						const col = document.createElement("col");
						col.classList.add("day-" + i);
						colgroup.appendChild(col);
					}
					return colgroup;
				},
				createTbody: function(year, month){
					const info = {
						// 前月の最終日を取得する
						daysInLastMonth: daysInMonthOf(year, month-1),
						// 今月の最終日を取得する
						daysInThisMonth: daysInMonthOf(year, month),
						// 次月の最終日を取得する
						daysInNextMonth: daysInMonthOf(year, month+1),
						// カレンダー上、前月で表示する日付の差分を取得する
						firstDayOfWeek: (new Date(year, month, 1)).getDay()
					}

					// tbodyに対して、前月・当月・次月の日付を埋め込む
					let tbody = document.createElement("tbody");
					tbody = this.inputThisMonth(tbody, year, month, info);
					tbody = this.prependLastMonth(tbody, year, month, info);
					tbody = this.appendNextMonth(tbody, year, month, info);
					return tbody;
				},
				inputThisMonth: function(tbody, year, month, info){
					let cell;
					let content;
					let showDate = 1;
					let firstDayOfWeek = info.firstDayOfWeek;
					// 当月分のカレンダーを作成する
					current_month_loop:
					for(let i = 0; i < 6; i++){
						let row = document.createElement("tr");
						for(let j = firstDayOfWeek + this.beginningDay,
								jlen = 7 + this.beginningDay; j < jlen; j++){
							cell = document.createElement("td");
							content = document.createElement("div");
							cell.classList.add("this-month");
							cell.classList.add(`${year}-${month+1}-${showDate}`);
							content.textContent = showDate;
							cell.appendChild(content);
							row.appendChild(cell);
							// 当月末日まできたら、作成を終える
							if(showDate === info.daysInThisMonth) {
								tbody.appendChild(row);
								break current_month_loop;
							}
							showDate++;
						}
						tbody.appendChild(row);
						firstDayOfWeek = 0;
					}
					return tbody;
				},
				prependLastMonth: function(tbody, year, month, info){
					// 差分があれば、前月分からHTMLを構築する
					let row = tbody.rows[0];
					let content;
					let cell;
					let firstDayOfWeek = info.firstDayOfWeek;
					if(firstDayOfWeek != 0){
						for(let i = 0, ilen = firstDayOfWeek - this.beginningDay; i < ilen; i++){
							cell = document.createElement("td");
							content = document.createElement("div");
							cell.classList.add("last-month");
							cell.classList.add(`${year}-${month}-${info.daysInLastMonth - i}`);
							content.textContent = info.daysInLastMonth - i;
							cell.appendChild(content);
							row.prepend(cell);
						}
					}
					return tbody;
				},
				appendNextMonth: function(tbody, year, month, info){
					let totalDays = info.daysInThisMonth + info.firstDayOfWeek;
					let row = tbody.rows[tbody.rows.length-1];
					if(row.cells.length === 7){
						row = document.createElement("tr");
					}
					let content;
					let cell;
					let showDate = 1;
					let startDayOfWeek = totalDays % 7;
					for(let i = 0, ilen = 6 - totalDays/7; i < ilen; i++){
						for(let j = startDayOfWeek,
								jlen = 7 + this.beginningDay; j < jlen; j++){
							cell = document.createElement("td");
							content = document.createElement("div");
							cell.classList.add("next-month");
							cell.classList.add(`${year}-${month+2}-${showDate}`);
							content.textContent = showDate;
							cell.appendChild(content);
							row.appendChild(cell);
							showDate++;
							totalDays++;
						}
						tbody.appendChild(row);
						row = document.createElement("tr");
						startDayOfWeek = 0;
					}
					return tbody;
				}
			};
	}


	_cal.calendar.prototype = {
		init: function(){
			// 取得できなかった場合はエラーを返す
			if(!document.getElementById(this.id)){
				throw new Error(`カレンダーを表示する要素の取得に失敗しました。[id=${this.id}]`);
			}
			this._calDiv = document.createElement("div");
			this._calDiv.id = `_cal_${this.id}`;
			this._calDiv.classList.add("_calDiv");
			document.getElementById(this.id).appendChild(this._calDiv);
		},
		createTable: function(year, month){
			const table = document.createElement("table");
			table.id = `calendar-${year}-${month}`;
			table.classList.add("calendar");
			table.classList.add(`calendar-${year}-${month}`);
			const colgroup = this.creator.createColgroup();
			const caption = this.creator.createCaption(year, month+1);
			const thead = this.creator.createThead();
			const tbody = this.creator.createTbody(year, month);
			this.applyTable(table, thead, tbody, caption, colgroup);
			return {table, thead, tbody};
		},

		applyTable: function(table, thead, tbody, caption, colgroup){
			// 作成したthead,tbodyをtableに組み込む
			table.appendChild(caption);
			table.appendChild(colgroup);
			table.appendChild(thead);
			table.appendChild(tbody);
			return table;
		},
		stock: function(year, month, table){
			// 既に指定された年月でストックされていれば、作らない
			if(this.isStocked(year, month)){
				return;
			}

			// 指定された年のストックがまだなかったら、オブジェクトを作る
			if( !this.isStocked(year)){
				this.stockCalendars[year] = {};
			}
			this.stockCalendars[year][month] = {"table": table};
		},
		resetShow: function(table){
			this._calDiv.innerHTML = "";
			this._calDiv.appendChild(table);
		},
		append: function(table){
			this._calDiv.appendChild(table);
		},
		prepend: function(table){
			this._calDiv.prepend(table);
		},
		isStocked: function(year, month){
			// 指定された年のストックがまだなかった場合
			if(this.stockCalendars[year] === null
				|| typeof(this.stockCalendars[year]) === 'undefined'){
				return false;
			}
			if(month === null || typeof(month) === 'undefined'){
				return true;
			}
			// 既に指定された年月でストックされていた場合
			if(this.stockCalendars[year][month] === null
					|| typeof(this.stockCalendars[year][month]) === 'undefined'){
				return false;
			}
			return true;
		},
		// 引数に指定された年・月で、ストックしていたtableオブジェクトを取得する
		fetchOf: function(year, month){
			if(this.isStocked(year, month)){
				return this.stockCalendars[year][month];
			}
			return null;
		},
		// 引数に指定された年・月をdomに反映させる
		reflectDom: function(year, month){
			let table;
			// 引数に指定されたtableが既に作成済みであれば、それを返す
			if(this.isStocked(year, month)){
				const obj = this.fetchOf(year, month);
				table = obj.table;
				return obj.table;
			}

			// まだ作成されていなければ、作成する
			const obj = this.createTable(year, month);
			table = obj.table;

			// 作成したtableはストックする
			this.stock(year, month, table);

			// 作成したtableをdomに反映させる
			// 年をまたいでいなければ、月で比較
			if(this.year == year){
				if(this.month < month){
					this.append(table);
				}else{
					this.prepend(table);
				}
			}else if(this.year < year){
				// 年を越していた場合
				this.append(table);
			}else{
				// 年をさかのぼった場合
				this.prepend(table);
			}
		},
		prev: function(){
			// 前月の年月を取得する
			const month = ((this.month-1) === -1) ? 11 : this.month-1;
			const year = (month === 11) ? this.year-1 : this.year;

			// DOMにtableを反映させる
			this.reflectDom(year, month);
			// 表示するカレンダーを切り替える
			this.switchCalendar(year, month);
		},
		next: function(){
			// 次月の年月を取得する
			const month = ((this.month+1) === 12) ? 0 : this.month+1;
			const year = (month === 0) ? this.year+1 : this.year;

			// DOMにtableを反映させる
			this.reflectDom(year, month);
			// 表示するカレンダーを切り替える
			this.switchCalendar(year, month);
		},
		move: function(year, month){
			// DOMにtableを反映させる
			this.reflectDom(year, month);
			// 表示するカレンダーを切り替える
			this.switchCalendar(year, month);
//			this._includedGap = false;
		},
		switchCalendar: function(targetYear, targetMonth){
			const activeTable = this.fetchOf(this.year, this.month);
			const targetTable = this.fetchOf(targetYear, targetMonth);
			activeTable.table.classList.remove("active");
//			const targetTable = document.getElementById(`calendar-${targetYear}-${targetMonth}`)
			targetTable.table.classList.add("active");
			this.table = targetTable.table;
			this.year = targetYear;
			this.month = targetMonth;
//			const translateX = this._calDiv.offsetLeft - targetTable.offsetLeft;
//			const translateX = basePoint - targetTable.offsetLeft;
//			this._calDiv.style = `transform: translateX(${translateX}px);`;
//			this._includedGap = true;
		}
	};

})();

function daysInMonthOf(year, month){
	return 32 - (new Date(year, month, 32)).getDate();
}