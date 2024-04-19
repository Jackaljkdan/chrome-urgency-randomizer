console.log(`urgency-randomizer v${chrome.runtime.getManifest().version}`);

const excludedParents = ["script", "style"];

function findMatchingNodes() {
    const matchingNodes: MatchingNode[] = [];
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT)

    while (walker.nextNode()) {
        const textNode = walker.currentNode as Text;
        const parent = textNode.parentElement!;
        const parentName = parent.nodeName.toLowerCase();

        if (excludedParents.includes(parentName))
            continue;

        if (parent.hasAttribute("data-urgency-randomizer"))
            continue;

        if (!textNode.textContent)
            continue;

        const text = textNode.textContent;

        const word = "urgente";
        const regex = new RegExp(word, "ig");
        const matches = [...text.matchAll(regex)];

        if (matches.length > 0) {
            matchingNodes.push({
                node: textNode,
                matches: matches as any,
            });
        }
    }

    return matchingNodes;
}

function replaceMatchingNode(matchingNode: MatchingNode) {
    const containerTag = document.createElement("span");
    containerTag.setAttribute("data-urgency-randomizer", "container");

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
            replacer: "[REDACTED]",
        });

        fromIndex = match.index + match[0].length;
    }

    for (const entry of list) {
        if (!entry.replacer) {
            containerTag.appendChild(document.createTextNode(entry.value));
        }
        else {
            const contentTag = document.createElement("span");
            contentTag.setAttribute("data-urgency-randomizer", "content");
            containerTag.appendChild(contentTag);

            const originalContentTag = document.createElement("span");
            originalContentTag.setAttribute("data-urgency-randomizer", "og");
            originalContentTag.innerHTML = entry.value;
            originalContentTag.style.display = "none";
            contentTag.appendChild(originalContentTag);

            const replacedContentTag = document.createElement("span");
            replacedContentTag.setAttribute("data-urgency-randomizer", "replacer");
            replacedContentTag.innerHTML = entry.replacer;
            contentTag.appendChild(replacedContentTag);
        }
    }

    matchingNode.node.after(containerTag);
    matchingNode.node.remove();
}

const matchingNodes = findMatchingNodes();

for (const m of matchingNodes)
    replaceMatchingNode(m);


chrome.runtime.onMessage.addListener((message: ChromeMessage, sender, callback) => {
    switch (message) {
        case "turn_on":
            console.log("turning on");
            break;
        case "turn_off":
            console.log("turning off");
            break;
    }
});
