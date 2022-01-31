import * as SockJS from "sockjs-client";
import * as Stomp from "stompjs";
import { Messenger } from "./Messenger";

export class YbmWebSocket {

	private _socket: any;
	private _stompClient: any;

	constructor(endpoint: string){
		this._socket = new SockJS.default(endpoint);
		this._stompClient = Stomp.over(this._socket);
	}
	
	connectWebSocket(subUrl: string, callBack: Function): void{
		this._stompClient.connect({}, (frame:string) => {
			console.log("Connected:" + frame);
			this._stompClient.subscribe(subUrl, function(data:string){
				//console.log("receive data:" + JSON.parse(data.body).content);
				callBack(data);
			})
		});
	}
	disconnectWebSocket(): void{
		if(this._stompClient !== null){
			this._stompClient.disconnect();
		}
	}
	send(url:string, json:string){
		this._stompClient.send(url, {}, json);
	}
}
