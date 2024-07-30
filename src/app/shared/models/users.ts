export interface User {
    id: string;
    email: string;
    role: UserRole

}

export type UserRole = 'Admin' | 'User'

