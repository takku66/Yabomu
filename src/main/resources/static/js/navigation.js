/**
 *DOM要素が読み込み完了だったらOKな処理
 */
window.addEventListener("DOMContentLoaded",function(){
	NAV.init();

}, false);

/**
 * home画面上で保持するオブジェクト
 */
const NAV = {
	navContainer: null,
	navContainerId: "nav-container",
	navList: null,
	nowShowElm: null,
	hdNowShowElm: null,
	hdNowShowElmId: "now-showing-menu",

	// 初期化処理
	init: function(){
		// hidden属性を設定する
		this.hdNowShowElm = document.getElementById(this.hdNowShowElmId);
		this.navContainer = document.getElementById(this.navContainerId);

		this.loadActiveMenu();
		this.HAMBURGER.init();
		this.configureMenuSwitchEvent();
		this.configureHumburgerEvent();
	},
	// アクティブにするメニューを設定する
	loadActiveMenu: function(){
		this.navList = this.navContainer.getElementsByTagName("li");
		if(this.hdNowShowElm && !this.hdNowShowElm.value){
			this.activateMenu(NAV.navList[0]);
		}else{
			const navName = this.hdNowShowElm.value;
			const elm = this.navContainer.querySelector(`[data-nav-name="${navName}"]`);
			this.activateMenu(elm);
		}
	},
	// 各メニューアイテムのイベント定義処理
	configureMenuSwitchEvent: function(){
		// ナビゲーション-URL定義
		// 各ボタンのIDに対して、リクエスト先のURL文字列を定義する
		const requestMap = {
			"nav-home":"/home",
			"nav-album":"/album",
			"nav-todolist":"/todolist",
			"nav-spot":"/spot",
			"nav-traffic":"/traffic",
			"nav-schedule":"/schedule"
		}
		// ボタンを押すと、下線がついてsubmitされる
		for(let elm of this.navList){
			elm.addEventListener("click", function(){
				NAV.activateMenu(this);
				const form = document.mainForm;
				form.method = "post";
				form.action = requestMap[elm.id];
				form.submit();
			}, false);
		}
	},

	// ハンバーガーメニューの押下時イベント
	configureHumburgerEvent: function(){
		const hamburger = document.getElementById("hamburger");
		hamburger.addEventListener("click", function(){
			NAV.HAMBURGER.toggle();
		}, false);
	},
	activateMenuId(str){
		const elm = this.navContainer.querySelector(`[data-nav-name="${str}"]`);
		NAV.activateMenu(elm);
	},
	// 引数に指定されたメニューをアクティブ化する
	activateMenu(elm){
		// 既に選択されていたものは、アクティブ化を解除する
		if(NAV.nowShowElm){
			NAV.nowShowElm.classList.remove("active");
		}

		// 渡された要素をアクティブ化する
		elm.classList.add("active");

		// NAVオブジェクトの現在表示中の要素を、渡された要素に更新する
		NAV.nowShowElm = elm;

		// サーバー連携用のhidden属性値を設定する
		NAV.putHdNowShowElm(elm);
	},

	// サーバー連携用のパラメータ設定メソッド
	putHdNowShowElm(elm){
		NAV.hdNowShowElm.value = NAV.nowShowElm.dataset.navName;
	},

	HAMBURGER: {
		hamburger: null,
		menu: null,
		init: function(){
			this.hamburger = document.getElementById("hamburger");
			this.menu = document.getElementById("g-navigation");
		},
		open: function(){
			this.hamburger.classList.add("open");
			this.menuOpen();
		},
		close: function(){
			this.hamburger.classList.remove("open");
			this.menuClose();
		},
		menuOpen: function(){
			this.menu.classList.add("open");
		},
		menuClose: function(){
			this.menu.classList.remove("open");
		},
		toggle: function(){
			if(this.hamburger.classList.contains("open")){
				this.close();
			}else{
				this.open();
			}
		}
	}

};

