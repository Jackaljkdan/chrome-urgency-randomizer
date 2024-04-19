import { onAnyMutation } from "./mutation";
import { findAndReplaceAllNodes, findAndReplaceNodesUnder } from "./replacement";

console.log(`urgency-randomizer v${chrome.runtime.getManifest().version}`);

findAndReplaceAllNodes();

onAnyMutation(findAndReplaceAllNodes);

chrome.runtime.onMessage.addListener((message: ChromeMessage, sender, callback) => {
    switch (message) {
        case "turn_on":
            console.log("turning on");
            findAndReplaceAllNodes();
            break;
        case "turn_off":
            console.log("turning off");
            break;
    }
});
