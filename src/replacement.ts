import { isTrueForAnyAncestorElement } from "./utils";
import { replacements, wordsToReplace } from "./words";

const excludedParents = ["SCRIPT", "STYLE", "INPUT", "TEXTAREA"];

const urgencyAttribute = "data-urgency-randomizer";

export function findMatchingNodes(root: Node) {
    const matchingNodes: MatchingNode[] = [];
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT)

    while (walker.nextNode()) {
        const textNode = walker.currentNode as Text;
        const parent = textNode.parentElement!;

        if (!textNode.textContent)
            continue;

        if (parent.hasAttribute(urgencyAttribute))
            continue;

        if (isTrueForAnyAncestorElement(parent, ancestor => (
            ancestor.className.includes("editable"))
            || ancestor.hasAttribute("g_editable")
            || excludedParents.includes(ancestor.tagName)
        ))
            continue;

        const text = textNode.textContent;

        const matches: RegExpExecArray[] = [];

        for (const word of wordsToReplace) {
            const regex = new RegExp(word, "ig");
            for (const m of text.matchAll(regex))
                matches.push(m as any);
        }

        if (matches.length > 0) {
            matchingNodes.push({
                node: textNode,
                matches: matches as any,
            });
        }
    }

    return matchingNodes;
}

export function replaceMatchingNode(matchingNode: MatchingNode) {
    const containerTag = document.createElement("span");
    containerTag.setAttribute(urgencyAttribute, "container");

    const text = matchingNode.node.textContent!;

    const list: Content[] = [];

    let fromIndex = 0;

    for (const match of matchingNode.matches) {
        // console.log("match", m);

        if (match.index == undefined)
            continue;

        if (match.index > fromIndex)
            list.push({ value: text.substring(fromIndex, match.index) });

        list.push({
            value: match[0],
            replacer: replacements[Math.floor(Math.random() * replacements.length)],
        });

        fromIndex = match.index + match[0].length;
    }

    // add all that remains after last matching word
    list.push({ value: text.substring(fromIndex) });

    for (const entry of list) {
        if (!entry.replacer) {
            containerTag.appendChild(document.createTextNode(entry.value));
        }
        else {
            const contentTag = document.createElement("span");
            contentTag.setAttribute(urgencyAttribute, "content");
            containerTag.appendChild(contentTag);

            const originalContentTag = document.createElement("span");
            originalContentTag.setAttribute(urgencyAttribute, "og");
            originalContentTag.innerHTML = entry.value;
            originalContentTag.style.display = "none";
            contentTag.appendChild(originalContentTag);

            const replacedContentTag = document.createElement("span");
            replacedContentTag.setAttribute(urgencyAttribute, "replacer");
            replacedContentTag.innerHTML = entry.replacer;
            contentTag.appendChild(replacedContentTag);
        }
    }

    const fullOgTag = document.createElement("span");
    fullOgTag.setAttribute(urgencyAttribute, "fullog");
    fullOgTag.innerHTML = text;
    fullOgTag.style.display = "none";
    containerTag.appendChild(fullOgTag);

    matchingNode.node.after(containerTag);
    matchingNode.node.remove();
}

export function findAndReplaceAllNodes() {
    findAndReplaceNodesUnder(document.body);
}

export function findAndReplaceNodesUnder(root: Node) {
    console.log("replacing...");

    const matchingNodes = findMatchingNodes(root);

    for (const m of matchingNodes)
        replaceMatchingNode(m);
}

export function undoReplacement() {
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_ELEMENT);
    const list: HTMLSpanElement[] = [];

    while (walker.nextNode()) {
        const element = walker.currentNode as HTMLElement;
        if (element.tagName !== "SPAN")
            continue;

        if (element.getAttribute(urgencyAttribute) !== "container")
            continue;

        list.push(element);
    }

    for (const element of list) {
        const fullOgTag = element.querySelector(`[${urgencyAttribute}="fullog"]`) as unknown as HTMLSpanElement;
        const textNode = document.createTextNode(fullOgTag.innerText);
        element.after(textNode);
        element.remove();
    }
}
