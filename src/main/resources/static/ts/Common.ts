export function findParent(elm, tagName){
	if(!tagName){ return false; }
	let parent = elm;
	for(let i = 0; i < 10; i++){
		parent = parent.parentNode;
		if(parent.tagName == tagName.toUpperCase()){
			return parent;
		}
	}
	return false;
}