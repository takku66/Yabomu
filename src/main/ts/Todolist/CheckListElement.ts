import { ICheckItemData } from "./ICheckItemData";

export class CheckListElement {

    private _checklistArea: HTMLElement;
    private _checklist: HTMLCollection;


    static CLS = {
        checklistArea: "checklist-area",
        checklist: "check-item",
    };

    static IDS = {
        chklst: {
            chklstArea: "checklist-edit-area",
        },
    };

    constructor(todoElm: HTMLElement){
        // 本インスタンスのメンバ変数を初期化する
        this._checklistArea = <HTMLElement>todoElm.getElementsByClassName(CheckListElement.CLS.checklistArea)[0];
        this._checklist = this._checklistArea.getElementsByClassName(CheckListElement.CLS.checklist);
    }

    public copyFrom(checkItemList: ICheckItemData[]): void{
        const diffLen = checkItemList.length - this._checklist.length;
        
        for(let i = 0, ilen = this._checklist.length; i < ilen; i++){
            const checkItemElm = new CheckItemElement(<HTMLElement>this._checklist[i]);
            checkItemElm.copyFrom(checkItemList[i]);
        }

        if(diffLen > 0){
            for(let addLen = 0; addLen < diffLen; addLen++){
                const addCheckItemElm = new CheckItemElement(CheckItemElement.createTemplateCheckItem());
                addCheckItemElm.copyFrom(checkItemList[this._checklist.length + addLen]);
            }
        }else{
            for(let rmLen = diffLen; rmLen < 0; rmLen++){
                this._checklistArea.removeChild(this._checklist[this._checklist.length + rmLen]);
            }
        }
        
    }

    /**
     * イベントIDとTODO ID以外の全ての要素をデフォルト値にクリアする
     */
    public clear(){
        if(this._checklistArea && this._checklist){
            Array.from(this._checklist).forEach((e) =>{
                this._checklistArea?.removeChild(e);
            });
        }
    }

    // ----- 参照のみ


    // ----- 参照・更新可能
    public getChecklist(): HTMLCollection{
        return this._checklist;
    }
    public checklistStatus(): string[]{
        if(this._checklist){
            return Array.from(this._checklist).map((e) => {
                return (<HTMLInputElement>e.getElementsByClassName("checklist checkbox status")[0]).value;
            });
        }
        return [""];
    }
    public checklistContent(): string[]{
        if(this._checklist){
            return Array.from(this._checklist).map((e) => {
                return (<HTMLInputElement>e.getElementsByClassName("checklist text")[0]).value;
            });
        }
        return [""];
    }
    public isExistsAnyCheckItem(): boolean{
        if(this._checklist.length > 0){
            return true;
        }
        return false;
    }
}

export class CheckItemElement {

    private _hidSeq: HTMLInputElement;
    private _chkStatus: HTMLInputElement;
    private _txtContent: HTMLInputElement;
    private _lblContent: HTMLElement;
    private _templateCheckItem: HTMLElement;

    static CLS = {
        checklist: "check-item",
        chklst: {
            seq: "checklist seq hid",
            status: "checklist status checkbox",
            lblContent: "check-item-content label",
            txtContent: "checklist text",
            deleteButton: "delete-btn-checklist",
        },
    };

    static IDS = {
        chklst: {
            templateElm: "checkItemTemplate",
        },
    };

    constructor(checkItemElm: HTMLElement){
        this._hidSeq = <HTMLInputElement>checkItemElm.getElementsByClassName(CheckItemElement.CLS.chklst.seq)[0];
        this._chkStatus = <HTMLInputElement>checkItemElm.getElementsByClassName(CheckItemElement.CLS.chklst.status)[0];
        this._txtContent = <HTMLInputElement>checkItemElm.getElementsByClassName(CheckItemElement.CLS.chklst.txtContent)[0];
        this._lblContent = <HTMLElement>checkItemElm.getElementsByClassName(CheckItemElement.CLS.chklst.lblContent)[0];
        this._templateCheckItem = CheckItemElement.createTemplateCheckItem();
    }

    public static createTemplateCheckItem(): HTMLElement{
        // チェックリストのテンプレート要素を作成する
		const templateCheckItem: HTMLElement = <HTMLElement>document.getElementById(CheckItemElement.IDS.chklst.templateElm);
		const checkItem = <HTMLElement>templateCheckItem.cloneNode(true);
		if(checkItem == null){
            throw new Error("チェック項目の雛形が存在しませんでした。");
		}
		checkItem.id = "";
		checkItem.classList.remove("hidden");
		return checkItem;
    }

    public copyFrom(checkItemData: ICheckItemData): void{

    }
}