import { findMatchingNodes, replaceMatchingNode } from "./replacement";

console.log(`urgency-randomizer v${chrome.runtime.getManifest().version}`);

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
