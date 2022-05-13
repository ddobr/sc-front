import { ContentElementType } from "../enums";

const tagMap: [string, string][] = [
    ['', ''],
    ['<b>', '</b>'],
    ['<i>', '</i>'],
    ['', ''],
]

export function getTags(style: ContentElementType): [string, string] {
    return tagMap[style];
}