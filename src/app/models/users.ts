export interface User {
    id: string;
    firstName: string;
    lastName: string;
    gender: "male" | "female" | "other";
    nationality: string;
    dateOfBirth: Date;
}
