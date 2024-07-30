export interface Student {
    id: string;
    firstName: string;
    lastName: string;
    // gender: Gender;
    gender: string;
    nationality: string;
    dateOfBirth: Date;
}

export type Gender = "Male" | "Female" | "Other"
