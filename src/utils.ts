export function isTrueForAnyAncestorElement(node: Node, predicate: (ancestor: HTMLElement) => boolean) {
    let ancestor = node as (HTMLElement | null);

    while (ancestor != null) {
        if (predicate(ancestor))
            return true;
        ancestor = ancestor.parentElement;
    }

    return false;
}
