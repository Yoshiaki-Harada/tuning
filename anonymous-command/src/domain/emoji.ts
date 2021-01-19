import { stampCommandRegExp } from "./tempate"

export class Emojis {
    constructor(readonly list: Emoji[]) { }
}

export class Emoji {
    constructor(readonly value: string) { }
}

export function createEmojis(originalText: string): Emojis {
    const regex = stampCommandRegExp
    const regex2 = new RegExp(/:(.*):/g)
    const result: Emoji[] | undefined = regex.exec(originalText)?.toString()
        .replace('[', '')
        .replace(']', '')
        .split(' ')
        .map((text) => text.match(regex2))
        .filter((result: RegExpMatchArray | null) => result !== null)
        .map((result) => {
            const text = result!!.toString()
            return text.substring(1, text.length - 1)
        })
        .map((text) => new Emoji(text)
        )
    return result ? new Emojis(result) : new Emojis([])
}