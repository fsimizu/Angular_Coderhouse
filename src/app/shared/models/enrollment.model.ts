import { Course } from "./course.model";
import { Student } from "./student.model";

export interface Enrollment {
    id: string | undefined;
    studentId: string;
    courseId: string
}

export interface StudentAndCourse {
    students: Student[];
    courses: Course[]
}

export interface EnrollmentEmbeded {
    studentId: string;
    courseId: string
    student: Student;
    course: Course
}

