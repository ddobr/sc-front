import { UserRole } from "../enums";

export interface IUser {
    id: string,
    first_name: string,
    last_name: string,
    middle_name: string|null,
    role: UserRole,
    joined: string,
    email: string,
    telegram: string,
    phone_number: string,
}
