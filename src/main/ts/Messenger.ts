import * as util from "./Common";

export class Messenger {
	
	private _elm: HTMLElement;
	private _messageList: HTMLElement;
	private _templateMsgItem: HTMLElement;

	private idlist = {
						"messageArea": "message-area",
						"messageList": "message-list",
					};
	
	private classlist = {
						"message": "message",
						"content": "content",
						"deleteBtnMessage": "delete-btn-message",
						"hide": "hide",
					};

	constructor(){
		this._elm = <HTMLElement>document.getElementById(this.idlist.messageArea);
		this._messageList = <HTMLElement>document.getElementById(this.idlist.messageList);
		this._templateMsgItem = this.createTemplateMsgItem();
	}
    
	private createTemplateMsgItem(): HTMLElement{
		const li = document.createElement("li");
		li.classList.add(this.classlist.message);
		const div = document.createElement("div");
		div.classList.add(this.classlist.content);
		const delBtn = document.createElement("button");
		delBtn.type="button";
		delBtn.classList.add(this.classlist.deleteBtnMessage);
		delBtn.innerText = "×";

		li.appendChild(delBtn);
		li.appendChild(div);
		return li;
	}
	private addEventDeleteMessage(delBtn: HTMLElement): void{
		delBtn.addEventListener("click", function(){
			const li = <HTMLElement>util.findParent(delBtn, "li");
			li.remove();
		}, false);
	}
	public pushMessage(message: string, expireTime: number): void{
		const msg = <HTMLElement>this._templateMsgItem.cloneNode(true);
		const delBtn = <HTMLElement>msg.getElementsByClassName(this.classlist.deleteBtnMessage)[0];
		this.addEventDeleteMessage(delBtn);
		(<HTMLElement>msg.getElementsByClassName(this.classlist.content)[0]).innerHTML = message;
		this._messageList.appendChild(msg);
		setTimeout(() => {
				this.hideMessage(msg)
		}, expireTime);
	}
	public hideMessage(msgElm: HTMLElement): void{
		msgElm.classList.add(this.classlist.hide);
	}
}
