import * as util from "./Common";
export class Messenger {
    constructor() {
        this._elm = document.getElementById("message-area");
        this._messageList = document.getElementById("message-list");
        this._templateMsgItem = this.createTemplateMsgItem();
    }
    createTemplateMsgItem() {
        const li = document.createElement("li");
        li.classList.add("message");
        const div = document.createElement("div");
        div.classList.add("content");
        const delBtn = document.createElement("button");
        delBtn.type = "button";
        delBtn.classList.add("delete-btn-message");
        delBtn.innerText = "×";
        this.addEventDeleteMessage(delBtn);
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
        msg.querySelector(".content").innerHTML = message;
        this._messageList.appendChild(msg);
        setTimeout(() => {
            this.hideMessage(msg);
        }, expireTime);
    }
    hideMessage(msgElm) {
        msgElm.classList.add("hide");
    }
}
//# sourceMappingURL=Messenger.js.map