import { snakeToCamelCase, toPascal } from ".";

export function objectToCamel<T>(obj: T): toPascal<T> {
    if (typeof obj === 'undefined' || obj === null || obj === undefined) {
        return obj as toPascal<T>;
    }

    // Если не объект и не массив, значит приметив, возвращаем его
    if (typeof obj !== 'object' && !Array.isArray(obj)) {
        return obj as toPascal<T>;
    // Если массив то на каждый элемент массива
    } else if (Array.isArray(obj)) { 
        return obj.map((element, i) => objectToCamel<T extends [] ? T[typeof i]: T>(element)) as toPascal<T>;
    }
 
    const resObj: {[key: string]: any} = {};

    Object.keys(obj).forEach(key => {
        let newValue = objectToCamel<any>((obj as {[key: string]: any})[key]);
        let newKey = snakeToCamelCase(key);

        resObj[newKey] = newValue;
    })

    return resObj as toPascal<T>;
}

export function objectToCamelOfKnownInterface<T>(obj: any): T {
    if (typeof obj === 'undefined' || obj === null || obj === undefined) {
        return obj;
    }

    // Если не объект и не массив, значит приметив, возвращаем его
    if (typeof obj !== 'object' && !Array.isArray(obj)) {
        return obj;
    // Если массив то на каждый элемент массива
    } else if (Array.isArray(obj)) { 
        return obj.map((element, i) => objectToCamel<T extends [] ? T[typeof i]: T>(element)) as unknown as T;
    }
 
    const resObj: {[key: string]: any} = {};

    Object.keys(obj).forEach(key => {
        let newValue = objectToCamel<any>((obj as {[key: string]: any})[key]);
        let newKey = snakeToCamelCase(key);

        resObj[newKey] = newValue;
    })

    return resObj as T;
}
