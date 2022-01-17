import * as util from "./Common";

export class Messenger {
	
	private _elm: HTMLElement;
	private _messageList: HTMLElement;
	private _templateMsgItem: HTMLElement;

	constructor(){
		this._elm = <HTMLElement>document.getElementById("message-area");
		this._messageList = <HTMLElement>document.getElementById("message-list");
		this._templateMsgItem = this.createTemplateMsgItem();
	}
    
	private createTemplateMsgItem(): HTMLElement{
		const li = document.createElement("li");
		li.classList.add("message");
		const div = document.createElement("div");
		div.classList.add("content");
		const delBtn = document.createElement("button");
		delBtn.type="button";
		delBtn.classList.add("delete-btn-message");
		delBtn.innerText = "×";
		this.addEventDeleteMessage(delBtn);

		li.appendChild(delBtn);
		li.appendChild(div);
		return li;
	}
	private addEventDeleteMessage(delBtn): void{
		delBtn.addEventListener("click", function(){
			const li = util.findParent(delBtn, "li");
			li.remove();
		}, false);
	}
	public pushMessage(message, expireTime): void{
		const msg = <HTMLElement>this._templateMsgItem.cloneNode(true);
		msg.querySelector(".content").innerHTML = message;
		this._messageList.appendChild(msg);
		setTimeout(() => {
				this.hideMessage(msg)
		}, expireTime);
	}
	public hideMessage(msgElm): void{
		msgElm.classList.add("hide");
	}
}
