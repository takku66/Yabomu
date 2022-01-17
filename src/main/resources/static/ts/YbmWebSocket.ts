import * as SockJS from "../js/lib/sockjs.min.js";
import * as Stomp from "../js/lib/stomp.min.js";

export class YbmWebSocket {

	_socket: any;
	_stompClient: any;
	_subUrl: string;
	constructor(endpoint, subUrl){
		this._socket = new SockJS(endpoint);
		this._stompClient = Stomp.Stomp.over(this._socket);
		this._subUrl = subUrl;
	}
	
	connectWebSocket(): void{
		this._stompClient.connect({}, function(frame){
			console.log("Connected:" + frame);
			this._stompClient.subscribe(this._subUrl, function(data){
				console.log("receive data:" + JSON.parse(data.body).content);
			})
		});
	}
	disconnectWebSocket(): void{
		if(this._stompClient !== null){
			this._stompClient.disconnect();
		}
	}
}
