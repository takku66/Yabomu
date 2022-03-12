export class CheckListElement {
    constructor(todoElm) {
        // 本インスタンスのメンバ変数を初期化する
        this._checklistArea = todoElm.getElementsByClassName(CheckListElement.CLS.checklistArea)[0];
        this._checklist = this._checklistArea.getElementsByClassName(CheckListElement.CLS.checklist);
    }
    copyFrom(checkItemList) {
        const diffLen = checkItemList.length - this._checklist.length;
        for (let i = 0, ilen = this._checklist.length; i < ilen; i++) {
            const checkItemElm = new CheckItemElement(this._checklist[i]);
            checkItemElm.copyFrom(checkItemList[i]);
        }
        if (diffLen > 0) {
            for (let addLen = 0; addLen < diffLen; addLen++) {
                const addCheckItemElm = new CheckItemElement(CheckItemElement.createTemplateCheckItem());
                addCheckItemElm.copyFrom(checkItemList[this._checklist.length + addLen]);
            }
        }
        else {
            for (let rmLen = diffLen; rmLen < 0; rmLen++) {
                this._checklistArea.removeChild(this._checklist[this._checklist.length + rmLen]);
            }
        }
    }
    /**
     * イベントIDとTODO ID以外の全ての要素をデフォルト値にクリアする
     */
    clear() {
        if (this._checklistArea && this._checklist) {
            Array.from(this._checklist).forEach((e) => {
                this._checklistArea?.removeChild(e);
            });
        }
    }
    // ----- 参照のみ
    // ----- 参照・更新可能
    getChecklist() {
        return this._checklist;
    }
    checklistStatus() {
        if (this._checklist) {
            return Array.from(this._checklist).map((e) => {
                return e.getElementsByClassName("checklist checkbox status")[0].value;
            });
        }
        return [""];
    }
    checklistContent() {
        if (this._checklist) {
            return Array.from(this._checklist).map((e) => {
                return e.getElementsByClassName("checklist text")[0].value;
            });
        }
        return [""];
    }
    isExistsAnyCheckItem() {
        if (this._checklist.length > 0) {
            return true;
        }
        return false;
    }
}
CheckListElement.CLS = {
    checklistArea: "checklist-area",
    checklist: "check-item",
};
CheckListElement.IDS = {
    chklst: {
        chklstArea: "checklist-edit-area",
    },
};
export class CheckItemElement {
    constructor(checkItemElm) {
        this._hidSeq = checkItemElm.getElementsByClassName(CheckItemElement.CLS.chklst.seq)[0];
        this._chkStatus = checkItemElm.getElementsByClassName(CheckItemElement.CLS.chklst.status)[0];
        this._txtContent = checkItemElm.getElementsByClassName(CheckItemElement.CLS.chklst.txtContent)[0];
        this._lblContent = checkItemElm.getElementsByClassName(CheckItemElement.CLS.chklst.lblContent)[0];
        this._templateCheckItem = CheckItemElement.createTemplateCheckItem();
    }
    static createTemplateCheckItem() {
        // チェックリストのテンプレート要素を作成する
        const templateCheckItem = document.getElementById(CheckItemElement.IDS.chklst.templateElm);
        const checkItem = templateCheckItem.cloneNode(true);
        if (checkItem == null) {
            throw new Error("チェック項目の雛形が存在しませんでした。");
        }
        checkItem.id = "";
        checkItem.classList.remove("hidden");
        return checkItem;
    }
    copyFrom(checkItemData) {
    }
}
CheckItemElement.CLS = {
    checklist: "check-item",
    chklst: {
        seq: "checklist seq hid",
        status: "checklist status checkbox",
        lblContent: "check-item-content label",
        txtContent: "checklist text",
        deleteButton: "delete-btn-checklist",
    },
};
CheckItemElement.IDS = {
    chklst: {
        templateElm: "checkItemTemplate",
    },
};
//# sourceMappingURL=CheckListElement.js.map