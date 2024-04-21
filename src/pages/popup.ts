import { state } from "../state";

function sendMessage(message: ChromeMessage, callback?: (response: any) => void) {
    chrome.tabs.query({ currentWindow: true, active: true }, tabs => {
        const currentTabID = tabs.length === 0 ? 0 : tabs[0].id!;
        chrome.tabs.sendMessage(currentTabID, message, callback!);
    });
}

const crossEmoji = "&#10060;";
const checkmarkEmoji = "&#x2713;";

(function () {
    const _btn = document.getElementById("btn");

    if (!_btn) {
        console.error("button not found");
        return;
    }

    // avoid ts complaints
    const btn = _btn;

    function refreshBtn() {
        btn.innerHTML = (
            state.value === "on"
                ? crossEmoji
                : checkmarkEmoji
        );
    }

    refreshBtn();

    btn.addEventListener("click", () => {
        state.value = state.value === "on" ? "off" : "on";
        sendMessage(state.value);
        refreshBtn();
    });
})();
