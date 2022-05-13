/**
 * Проверяет валидность емейла
 * @param email емеил
 * @returns true если валидный и false наоборот
 */
export const isValidEmail = (email: string): boolean => {
    // eslint-disable-next-line
    return email.match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/) !== null;
}