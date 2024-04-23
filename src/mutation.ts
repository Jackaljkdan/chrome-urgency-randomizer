export function onAnyMutation(callback: () => void) {
    let timeout: any = undefined;

    function debounceCallback() {
        clearTimeout(timeout);
        timeout = setTimeout(
            callback,
            100,
        );
    }

    // https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver#example
    const observer = new MutationObserver((_mutationList, _observer) => {
        debounceCallback();
    });

    observer.observe(document.body, { childList: true, subtree: true });

    // https://gomakethings.com/how-to-detect-when-the-browser-url-changes-with-vanilla-js/
    window.addEventListener('popstate', function (_event) {
        debounceCallback();
    });

    return observer;
}
