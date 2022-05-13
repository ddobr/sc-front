
import { ProviderOf } from "./core";
import { UserMethods } from "./User/user-methods.interface";
import fakeUserProvider from './User/Fake/fake-user-provider';
import userProvider from './User/Real/user-provider';

let user: ProviderOf<UserMethods>;

if (process.env.REACT_APP_IS_FAKE_API === 'true') {
    user = fakeUserProvider;
} else {
    user = userProvider;
};

export { user }
