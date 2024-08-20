import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { SharedModule } from '../../../shared/shared.module';
import { LoginComponent } from './login.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { provideMockStore } from '@ngrx/store/testing';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {

    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [
        SharedModule,
        HttpClientTestingModule,
        RouterTestingModule
      ],
      providers: [
        provideAnimationsAsync(), 
        provideMockStore({})
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('should be required to put an email', () => {
    const emailField = component.loginForm.get('email')
    emailField?.setValue('');
    expect(emailField?.invalid).toBeTrue(); 
  });

  it('should alert if form is invalid', () => {
    const loginForm = component.loginForm
    loginForm.setValue({
      email: '',
      password: ''
    });
    const spyOnAlert = spyOn(window, 'alert')
    component.onSubmit();
    expect(spyOnAlert).toHaveBeenCalled()
  });

  it('should invoke the authService.login when using the onSubmit with a valid form', ()=>{
    const loginForm = component.loginForm
    loginForm.setValue({
      email: 'test@test.com',
      password: '123124123123'
    });
    const spyOnLogin = spyOn((component as any).authService, 'login')
    component.onSubmit();
    expect(spyOnLogin).toHaveBeenCalled()

  });




});
