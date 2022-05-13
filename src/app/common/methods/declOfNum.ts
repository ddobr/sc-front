/**
 * Склонение слов от числа
 * 
 * ['минута', 'минуты', 'минут']
 * 
 * @param num число
 * @param text_forms массив слова в разных падежах
 * @returns слово в нужном падеже
 */
export function declOfNum(num: number, text_forms: string[]): string {  
    num = Math.abs(num) % 100; 
    let num10 = num % 10;
    if (num > 10 && num < 20) { return text_forms[2]; }
    if (num10 > 1 && num10 < 5) { return text_forms[1]; }
    if (num10 === 1) { return text_forms[0]; }
    return text_forms[2];
}
