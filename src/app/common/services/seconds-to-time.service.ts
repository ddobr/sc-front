
/**
 * Вывод секунд в формате 00:12:54 (часы:минуты:секунды)
 * @param seconds секунды
 * @returns 
 */
export function secondsToTime(seconds: number): string {
    if (seconds < 0) {
        throw new Error('Попытка парсинга отрицательного числа');
    }

    seconds = Math.floor(seconds);
    const parsedSeconds = parseTime(seconds % 60);

    const minutes = Math.floor(seconds /= 60);
    const parsedMinutes = parseTime(minutes % 60);

    const hours = Math.floor(minutes / 60);
    const parsedHours = parseTime(hours);

    return [parsedHours, parsedMinutes, parsedSeconds].join(':');
}

/**
 * Вывод секунд в формате 0д 01ч 12мин 23с
 * @param seconds секунды
 * @param showSeconds показывать ли секунды в конце строки
 * @returns 
 */
export function secondsToTextDate(seconds: number, showSeconds = false): string {
    if (seconds < 0) {
        throw new Error('Попытка парсинга отрицательного числа');
    }

    seconds = Math.floor(seconds);
    const parsedSeconds = parseTime(seconds % 60);

    const minutes = Math.floor(seconds /= 60);
    const parsedMinutes = parseTime(minutes % 60);

    const hours = Math.floor(minutes / 60);
    const parsedHours = parseTime(hours % 24);

    const days = Math.floor(hours / 24);

    let result = '';

    result += `${days}д `
    result += `${parsedHours}ч `
    result += `${parsedMinutes}мин `
    if (showSeconds) {
        result += `${parsedSeconds}с`;
    }

    return result;
}

const parseTime = (myNumber: number) => {
    return ('0' + myNumber.toString()).slice(-2)
}