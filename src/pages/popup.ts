
function sendMessage(message: ChromeMessage, callback?: (response: any) => void) {
    chrome.tabs.query({ currentWindow: true, active: true }, tabs => {
        const currentTabID = tabs.length === 0 ? 0 : tabs[0].id!;
        chrome.tabs.sendMessage(currentTabID, message, callback!);
    });
}

document.getElementById("on-btn")?.addEventListener("click", () => {
    sendMessage("turn_on");
    document.getElementById("status")!.innerHTML = "on";
});

document.getElementById("off-btn")?.addEventListener("click", () => {
    sendMessage("turn_off");
    document.getElementById("status")!.innerHTML = "off";
});
