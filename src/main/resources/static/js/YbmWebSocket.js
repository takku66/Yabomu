import * as SockJS from "sockjs-client";
import * as Stomp from "stompjs";
export class YbmWebSocket {
    constructor(endpoint) {
        this._socket = new SockJS.default(endpoint);
        this._stompClient = Stomp.over(this._socket);
    }
    connectWebSocket(subUrl, callBack) {
        this._stompClient.connect({}, (frame) => {
            console.log("Connected:" + frame);
            this._stompClient.subscribe(subUrl, function (data) {
                //console.log("receive data:" + JSON.parse(data.body).content);
                callBack(data);
            });
        });
    }
    disconnectWebSocket() {
        if (this._stompClient !== null) {
            this._stompClient.disconnect();
        }
    }
    send(url, json) {
        this._stompClient.send(url, {}, json);
    }
}
//# sourceMappingURL=YbmWebSocket.js.map