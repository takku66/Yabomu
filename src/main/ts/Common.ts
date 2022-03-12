export function findParent(elm:HTMLElement, tagName:string): HTMLElement | null{
	
	if(tagName === null || tagName === "") return null;
	if(elm === null) return null;
	let parent = elm;
	for(let i = 0; i < 20; i++){
		parent = <HTMLElement>parent.parentNode;
		if(parent.tagName === tagName.toUpperCase()){
			return parent;
		}
	}
	return null;
}

export class TransactionInfo<T> {
	private _code: string;
    private _message: string;
    private _error: boolean;
    private _method: string;
    private _object: object;
	private _data: T | null;

	constructor(json: string){
		const info = JSON.parse(json);
		this._code = info.code;
		this._message = info.message;
		this._error = info.isError;
		this._method = info.method;
		this._object = info.object;
		if(this._object){
			this._data = info.object;
		}else{
			this._data = null;
		}
	}

	public getCode(): string{
		return this._code;
	}
	public getMessage(): string{
		return this._message;
	}
	public isError(): boolean{
		return this._error;
	}
	public getMethod(){
		return this._method;
	}
	public getObject(): object{
		return this._object;
	}
	public getData():  T | null{
		return this._data;
	}
	public isNonData(): boolean {
		return (this._data == null);
	}
}