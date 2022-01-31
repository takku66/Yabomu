import * as util from "./Common";
export class Messenger {
    constructor() {
        this.idlist = {
            "messageArea": "message-area",
            "messageList": "message-list",
        };
        this.classlist = {
            "message": "message",
            "content": "content",
            "deleteBtnMessage": "delete-btn-message",
            "hide": "hide",
        };
        this._elm = document.getElementById(this.idlist.messageArea);
        this._messageList = document.getElementById(this.idlist.messageList);
        this._templateMsgItem = this.createTemplateMsgItem();
    }
    createTemplateMsgItem() {
        const li = document.createElement("li");
        li.classList.add(this.classlist.message);
        const div = document.createElement("div");
        div.classList.add(this.classlist.content);
        const delBtn = document.createElement("button");
        delBtn.type = "button";
        delBtn.classList.add(this.classlist.deleteBtnMessage);
        delBtn.innerText = "×";
        li.appendChild(delBtn);
        li.appendChild(div);
        return li;
    }
    addEventDeleteMessage(delBtn) {
        delBtn.addEventListener("click", function () {
            const li = util.findParent(delBtn, "li");
            li.remove();
        }, false);
    }
    pushMessage(message, expireTime) {
        const msg = this._templateMsgItem.cloneNode(true);
        const delBtn = msg.getElementsByClassName(this.classlist.deleteBtnMessage)[0];
        this.addEventDeleteMessage(delBtn);
        msg.getElementsByClassName(this.classlist.content)[0].innerHTML = message;
        this._messageList.appendChild(msg);
        setTimeout(() => {
            this.hideMessage(msg);
        }, expireTime);
    }
    hideMessage(msgElm) {
        msgElm.classList.add(this.classlist.hide);
    }
}
//# sourceMappingURL=Messenger.js.map