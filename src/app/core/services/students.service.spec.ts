import { HttpClientTestingModule, HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { MockProvider } from 'ng-mocks';
import { StudentsService } from './students.service';
import { environment } from '../../../environments/environment';
import { Student } from '../../shared/models/student.model';
import { map } from 'rxjs';

describe('StudentsService', () => {
    let service: StudentsService;
    let router: Router;
    let httpController: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule
            ],
            providers: [
                MockProvider(Router),
                provideHttpClientTesting(),
            ],
        });
        httpController = TestBed.inject(HttpTestingController)
        service = TestBed.inject(StudentsService);
        router = TestBed.inject(Router)
    });

    it('should do an http request to /students when invoking the get students', () => {
        const mockedResponse: Student[] = [
            {
                id: "h45fj",
                firstName: "Fernando",
                lastName: "Chapa",
                gender: "male",
                nationality: "Argentina",
                dateOfBirth: new Date("10/02/1999"),
            },
        ]
        service.getStudents().subscribe({
            next: (res) => {
                expect(res).toEqual(mockedResponse);
            }
        });
        httpController.expectOne({
            url: environment.apiUrl + '/students',
            method: 'GET'
        }).flush(mockedResponse)

        expect(service).toBeTruthy();
    });

    it('should return the student with the specified ID from getStudents', () => {
        const studentId = 'h45fj';
        const mockedStudents: Student[] = [
            {
                "firstName": "Fernando",
                "lastName": "Chapa",
                "gender": "male",
                "nationality": "Argentina",
                "dateOfBirth": new Date("2002-08-01"),
                "id": "h45fj"
            },
            {
                "firstName": "Lucas",
                "lastName": "Rodriguez",
                "gender": "male",
                "nationality": "Mexico",
                "dateOfBirth": new Date("2024-08-12"),
                "id": "4h65z"
            },
        ];
        const expectedStudent = mockedStudents.find((el) => el.id === studentId);

        service.getStudents()
            .pipe(
                map((students) => students.find((el) => el.id === studentId))
            ).subscribe((student) => {
                expect(student).toEqual(expectedStudent);
            });

        const mockRequest = httpController.expectOne(environment.apiUrl + '/students');
        mockRequest.flush(mockedStudents);
    });

    it('should add a new student using HTTP POST', () => {
        const newStudent: Student = {
            "id": "ds4tf",
            "firstName": "Juan",
            "lastName": "Rodriguez",
            "gender": "male",
            "nationality": "Mexico",
            "dateOfBirth": new Date("2024-08-12"),
        };
        const expectedResponse: Student[] = [newStudent];

        service.addStudent(newStudent).subscribe((students) => {
            expect(students).toEqual(expectedResponse);
        });

        const mockRequest = httpController.expectOne({
            url: environment.apiUrl + '/students',
            method: 'POST'
        });
        mockRequest.flush(expectedResponse);
    });

    it('should delete a student using HTTP DELETE', () => {
        const studentId = 'h45fj';
        const mockedStudentsBeforeDelete: Student[] = [
            {
                "firstName": "Fernando",
                "lastName": "Chapa",
                "gender": "male",
                "nationality": "Argentina",
                "dateOfBirth": new Date("2002-08-01"),
                "id": "h45fj"
            },
            {
                "firstName": "Lucas",
                "lastName": "Rodriguez",
                "gender": "male",
                "nationality": "Mexico",
                "dateOfBirth": new Date("2024-08-12"),
                "id": "4h65z"
            },
        ];
        const expectedStudentsAfterDelete = mockedStudentsBeforeDelete.filter((el) => el.id !== studentId);
      
        service.deleteStudentById(studentId).subscribe(() => {});
      
        const mockRequest = httpController.expectOne({
          url: environment.apiUrl + '/students/' + studentId,
          method: 'DELETE'
        });
        mockRequest.flush({});
        expect(mockRequest).toBeTruthy();
        expect(expectedStudentsAfterDelete.find(student => student.id === studentId)).toBeUndefined();
      });
});