console.log(`urgency-randomizer v${chrome.runtime.getManifest().version}`);

const excludedParents = ["script", "style"];

function findNodesAndReplaceContents() {
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT)
    while (walker.nextNode()) {
        const textNode = walker.currentNode as Text;
        const parentName = textNode.parentNode?.nodeName.toLowerCase();
        if (parentName != undefined && excludedParents.includes(parentName))
            continue;

        // TODO: devo mettere in una lista quelli che matchano e solo dopo che ho finito il walk sostituirli
        replaceNodeContent(textNode);
    }
}

function replaceNodeContent(textNode: Text) {
    console.log(textNode.textContent);
    if (!textNode.textContent)
        return;

    const text = textNode.textContent;
    const parent = textNode.parentNode!;

    const word = "urgente";
    const regex = new RegExp(word, "ig");
    const matches = text.matchAll(regex);

    for (const m of matches) {
        console.log("match", m);

        if (m.index == undefined)
            continue;

        const prevText = text.substring(0, m.index);
        const prevNode = document.createTextNode(prevText);

        const nextText = text.substring(m.index + word.length);
        const nextNode = document.createTextNode(nextText);

        const replacingSpan = document.createElement("span");
        replacingSpan.innerHTML = "[REDACTED]";

        parent.insertBefore(prevNode, textNode);
        textNode.after(replacingSpan, nextNode);

        textNode.remove();

        return;
    }
}

findNodesAndReplaceContents();


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
