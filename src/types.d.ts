declare type ChromeMessage = "on" | "off";

declare type MatchingNode = {
    node: Text,
    matches: RegExpExecArray[],
};

declare type Content = {
    value: string,
    replacer?: string,
};
