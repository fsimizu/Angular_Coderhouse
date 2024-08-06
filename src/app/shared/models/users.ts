export interface User {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    token: string;
    role: UserRole

}

export type UserRole = 'admin' | 'user'

