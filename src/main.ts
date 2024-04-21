import { onAnyMutation } from "./mutation";
import { findAndReplaceAllNodes, findAndReplaceNodesUnder } from "./replacement";
import { state } from "./state";

console.log(`urgency-randomizer v${chrome.runtime.getManifest().version}`);

if (state.value === "on")
    findAndReplaceAllNodes();

onAnyMutation(() => {
    if (state.value === "on")
        findAndReplaceAllNodes();
});

chrome.runtime.onMessage.addListener((message: ChromeMessage, sender, callback) => {
    switch (message) {
        case "on":
            findAndReplaceAllNodes();
            break;
        case "off":
            console.log("turning off");
            break;
    }
});
