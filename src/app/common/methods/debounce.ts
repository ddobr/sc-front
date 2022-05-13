export function debounce<TP>(callbackFn: (params: TP) => any, cooldown: number): (params: TP) => void {
    let timeoutId: any = null;

    return function (params: TP) {
        if (timeoutId !== null) {
            clearTimeout(timeoutId);
        }

        timeoutId = setTimeout(() => {
            callbackFn(params);
        }, cooldown);
    };
}