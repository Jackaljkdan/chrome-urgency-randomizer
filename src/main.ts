import { onAnyMutation } from "./mutation";
import { findAndReplaceAllNodes, findAndReplaceNodesUnder, undoReplacement } from "./replacement";
import { state } from "./state";

console.log(`urgency-randomizer v${chrome.runtime.getManifest().version}`);

if (state.value === "on")
    findAndReplaceAllNodes();

onAnyMutation(() => {
    if (state.value === "on")
        findAndReplaceAllNodes();
});

chrome.runtime.onMessage.addListener((message: ChromeMessage, sender, callback) => {
    // this is not shared between this code and the popup :(
    state.value = message;

    switch (message) {
        case "on":
            findAndReplaceAllNodes();
            break;
        case "off":
            undoReplacement();
            break;
    }
});
