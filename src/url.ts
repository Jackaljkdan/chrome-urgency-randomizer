export const includedUrls = [
    "https://mail.google.com",
];

export function isUrlOk() {
    const url = window.location.href;

    if (url.endsWith("urgency-randomizer/public/test.html"))
        return true;

    for (const included of includedUrls) {
        if (url.startsWith(included))
            return true;

        if (url.startsWith("https://" + included))
            return true;

        if (url.startsWith("http://" + included))
            return true;

        if (url.startsWith("https://www." + included))
            return true;

        if (url.startsWith("http://www." + included))
            return true;
    }

    return false;
}
