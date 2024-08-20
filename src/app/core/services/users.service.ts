import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { User } from '../../shared/models/users';


@Injectable({
    providedIn: 'root'
})

export class UsersService {

    constructor(private httpClient: HttpClient){}

    getUsers(): Observable<User[]> {
        return this.httpClient.get<User[]>(environment.apiUrl + '/users')
    };

    getUserById(id: string): Observable<User | undefined> {
        return this.getUsers().pipe(
            map((users) => users.find((el) => el.id === id))
        )
    };

    // getUserByEmail(email: string): Observable<User | undefined> {
    //     return this.getUsers().pipe(
    //         map((users) => users.find((el) => el.email === email))
    //     )
    // };

    addUsers(users: User): Observable<User> {
        return this.httpClient.post<User>(environment.apiUrl + '/users', users)
    };

    deleteUserById(id: string): Observable<User> {
        return this.httpClient.delete<User>(environment.apiUrl + '/users/' + id)

    };

    editUsers(id: string, editedUser: User): Observable<User> {
        return this.httpClient.put<User>(environment.apiUrl + '/users/' + id, editedUser)
    };

}
