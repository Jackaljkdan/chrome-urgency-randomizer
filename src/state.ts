import { isUrlOk } from "./url";

export const state = {
    value: isUrlOk() ? "on" : "off" as ("on" | "off"),
};
