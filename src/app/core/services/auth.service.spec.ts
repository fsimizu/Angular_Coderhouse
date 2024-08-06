import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { MockProvider } from 'ng-mocks';
import { HttpClientTestingModule, HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { environment } from '../../../environments/environment';

describe('AuthService', () => {
  let service: AuthService;
  let router: Router;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        MockProvider(Router),
        provideHttpClientTesting(),
      ]
    });
    service = TestBed.inject(AuthService);
    router = TestBed.inject(Router);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should navigate to the dashboard after a successful log in', () => {
    const spyOnNavigate = spyOn(router, 'navigate');
    const credentials = {email: "Fernando@test.com", password: "1234"};
    service.login(credentials);
    const req = httpMock.expectOne(req => req.url === `${environment.apiUrl}/users` && req.params.has('email'));
    expect(req.request.method).toBe('GET');
    expect(req.request.params.get('email')).toBe(credentials.email);

    req.flush([{ email: 'Fernando@test', password: '1234', token: 'dummy-token' }]);
    expect(localStorage.getItem('token')).toBe('dummy-token');
    expect(router.navigate).toHaveBeenCalledWith(['dashboard', 'home']);
  });

});
