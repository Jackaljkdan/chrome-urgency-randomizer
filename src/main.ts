import { onAnyMutation } from "./mutation";
import { findAndReplaceAllNodes, undoReplacement } from "./replacement";
import { state } from "./state";

console.log(`urgency-randomizer v${chrome.runtime.getManifest().version}`, state);

let deactivate = () => { };

function activate() {
    findAndReplaceAllNodes();

    const observer = onAnyMutation(() => {
        findAndReplaceAllNodes();
    });

    return () => {
        observer.disconnect();
        undoReplacement();
    };
}

if (state.value === "on")
    deactivate = activate();

chrome.runtime.onMessage.addListener((message: ChromeMessage, sender, callback) => {
    // this is not shared between this code and the popup that sends the message :(
    state.value = message;

    switch (message) {
        case "on":
            deactivate = activate();
            break;
        case "off":
            deactivate();
            break;
    }
});
