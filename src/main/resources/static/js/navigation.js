/**
 *DOM要素が読み込み完了だったらOKな処理
 */
window.addEventListener("DOMContentLoaded",function(){
	NAV.init();
	NAV.configureMenuSwitchEvent();
	NAV.configureHumburgerEvent();
}, false);

/**
 * home画面上で保持するオブジェクト
 */
const NAV = {
	navList: null,
	nowActive: null,
	nowShowElm: null,
	hdNowShowElmId: "now-showing-item",

	// 初期化処理
	init: function(){
		const container = document.getElementById("nav-container");
		this.navList = container.getElementsByTagName("li");
		const hdNowShowElm = document.getElementById(this.hdNowShowElmId);
		if(typeof(hdNowShowElm.value) === 'undefined' || hdNowShowElm.value === null || hdNowShowElm.value === ""){
			this.nowShowElm = NAV.navList[0];
			this.navList[0].classList.add("active");
			hdNowShowElm.value = this.navList[0].dataset.navName;
		}
	},

	// 各メニューアイテムのイベント定義処理
	configureMenuSwitchEvent: function(){
		// 各ボタンに、submit用のイベントを付与する
		for(let elm of this.navList){
			elm.addEventListener("click", function(){
				if(this === NAV.nowShowElm){return;}
				this.classList.add("active");
				NAV.nowShowElm.classList.remove("active");
				NAV.nowShowElm = this;
			}, false);
		}
	},

	// ハンバーガーメニューの押下時イベント
	configureHumburgerEvent: function(){
		const hamburger = document.getElementById("hamburger");
		hamburger.addEventListener("click", function(){
			const menu = document.getElementById("g-navigation");
			if(this.classList.contains("open")){
				this.classList.remove("open");
				menu.classList.remove("open");
			}else{
				this.classList.add("open");
				menu.classList.add("open");
			}
		}, false);
	}

};

