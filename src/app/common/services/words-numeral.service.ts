/**
 * Склоняет слово в зависимости от числительного
 * @param numeral числительное
 * @param words [кружка, кружки, кружек] (1, 2, 5)
 */

export const getWordNumeral = (numeral: number, words: string[]): string => {
    if ((Math.floor((numeral % 100) / 10) === 1) || numeral % 10 >= 5 || numeral % 10 === 0) {
        return words[2];
    }

    if (numeral % 10 === 1) {
        return words[0];
    }

    return words[1];
}