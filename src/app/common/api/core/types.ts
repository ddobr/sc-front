export interface Response<T> {
    data: T, 
    status: number
}

export interface Subscription<T> {
    cancelFn: (message?: string) => void,
    response: Promise<Response<T>>,
}

export type ProviderOf<T> = {
    [K in keyof T]:  ( ...args: T[K] extends ((...args: any) => any) ? Parameters<T[K]> : [] ) => Subscription<T[K] extends ((...args: any) => any) ? ReturnType<T[K]> : T[K]>
}

export type MethodArgs =  { url: string, method: 'post' | 'get' | 'patch', body?: any };

export type MethodArgsFor<T> = {
    [K in keyof T]:  (...args: T[K] extends ((...args: any) => any) ? Parameters<T[K]> : [] ) => MethodArgs
}

export interface HTTPServer {
    get<T = any, R = Response<T>>(url: string, config?: any): Promise<R>,
    //delete<T = any, R = Response<T>>(url: string, config?: any): Promise<R>,
    //head<T = any, R = Response<T>>(url: string, config?: any): Promise<R>,
    //options<T = any, R = Response<T>>(url: string, config?: any): Promise<R>,
    post<T = any, R = Response<T>>(url: string, data?: any, config?: any): Promise<R>,
    //put<T = any, R = Response<T>>(url: string, data?: any, config?: any): Promise<R>,
    patch<T = any, R = Response<T>>(url: string, data?: any, config?: any): Promise<R>,
}