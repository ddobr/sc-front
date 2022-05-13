// import Cookie from 'js-cookie';
import { user } from '../api';


const TOKEN = 'TOKEN';

export function loggedIn(): boolean {
    const token = localStorage.getItem(TOKEN);
    return token !== null && token !== undefined && token !== 'undefined';
}

export function getToken(): string {
  return localStorage.getItem(TOKEN) || '';
}

export function setToken(token: string) {
  localStorage.setItem(TOKEN, token);
}

export function login(email: string, password: string): Promise<void> {
  const loginSub = user.login(email, password);

  return loginSub.response.then((res) => {
    if (process.env.REACT_APP_IS_FAKE_API === 'true') {
      localStorage.setItem(TOKEN, res.data.token);
    } else {
      localStorage.setItem(TOKEN, res.data.token);
    }
  });
}

export function logout(): void {
  localStorage.removeItem(TOKEN);
}

export function clear(): void {
  localStorage.removeItem(TOKEN);
}
