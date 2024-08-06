export interface Student {
    id: string;
    firstName: string;
    lastName: string;
    gender: Gender;
    nationality: string;
    dateOfBirth: Date;
}

export type Gender = "male" | "female" | "other"
