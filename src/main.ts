console.log(`urgency-randomizer v${chrome.runtime.getManifest().version}`);

const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT)

const excludedParents = ["script", "style"]

while (walker.nextNode()) {
    const textNode = walker.currentNode;
    const parentName = textNode.parentNode?.nodeName.toLowerCase();
    if (parentName != undefined && excludedParents.includes(parentName))
        continue;
    // do something
    console.log(textNode.textContent);
}

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
