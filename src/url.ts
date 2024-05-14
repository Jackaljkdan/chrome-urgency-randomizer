export function isUrlOk() {
    const url = window.location.href;

    if (url.includes("www.notion.so"))
        return false;

    return true;
}
