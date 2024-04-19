declare type ChromeMessage = "turn_on" | "turn_off";

declare type MatchingNode = {
    node: Text,
    matches: RegExpExecArray[],
};

declare type Content = {
    value: string,
    replacer?: string,
};
