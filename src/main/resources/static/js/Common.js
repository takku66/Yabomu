export function findParent(elm, tagName) {
    if (tagName === null || tagName === "")
        return null;
    if (elm === null)
        return null;
    let parent = elm;
    for (let i = 0; i < 20; i++) {
        parent = parent.parentNode;
        if (parent.tagName === tagName.toUpperCase()) {
            return parent;
        }
    }
    return null;
}
export class TransactionInfo {
    constructor(json) {
        const info = JSON.parse(json);
        this._code = info.code;
        this._message = info.message;
        this._error = info.isError;
        this._method = info.method;
        this._object = info.object;
        if (this._object) {
            this._data = info.object;
        }
        else {
            this._data = null;
        }
    }
    getCode() {
        return this._code;
    }
    getMessage() {
        return this._message;
    }
    isError() {
        return this._error;
    }
    getMethod() {
        return this._method;
    }
    getObject() {
        return this._object;
    }
    getData() {
        return this._data;
    }
    isNonData() {
        return (this._data == null);
    }
}
//# sourceMappingURL=Common.js.map