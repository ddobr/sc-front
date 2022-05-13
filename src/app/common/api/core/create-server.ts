import axios from "axios";
import { HTTPServer, MethodArgs, Subscription } from ".";
import { getToken } from "../../methods/auth";

export function createAuthorizedServer(http: HTTPServer) {
    return function<T>(methodArgs: MethodArgs): Subscription<T> {
        const source = axios.CancelToken.source();
        if (process.env.REACT_APP_LOG_REQUESTS === 'true') {
            console.log(`${methodArgs.method}: ${methodArgs.url}`);
        }
        
        if (methodArgs.method === 'get') {
            return {
                cancelFn: source.cancel,
                response: http[methodArgs.method]<T>(
                    methodArgs.url, 
                    { 
                        headers: { 
                            'Authorization': `Basic ${getToken()}`, 
                        },
                        cancelToken: source.token 
                    })
            } 
        }

        return {
            cancelFn: source.cancel,
            response: http[methodArgs.method]<T>(
                methodArgs.url, 
                methodArgs.body, 
                { 
                    headers: { 
                        'Authorization': `Basic ${getToken()}`, 
                    },
                    cancelToken: source.token 
                })
        };
    }
}

export function createAnonymousServer(http: HTTPServer) {
    return function<T>(methodArgs: MethodArgs): Subscription<T> {
        const source = axios.CancelToken.source();
        if (process.env.REACT_APP_LOG_REQUESTS === 'true') {
            console.log(`${methodArgs.method}: ${methodArgs.url}`);
        }

        if (methodArgs.method === 'get') {
            return {
                cancelFn: source.cancel,
                response: http[methodArgs.method]<T>(
                    methodArgs.url, 
                    { 
                        headers: { 
                        },
                        cancelToken: source.token 
                    })
            } 
        }

        return {
            cancelFn: source.cancel,
            response: http[methodArgs.method]<T>(
                methodArgs.url, 
                methodArgs.body, 
                { 
                    headers: { 
                    },
                    cancelToken: source.token 
                })
        }; 
    }
}