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
//# sourceMappingURL=Common.js.map