import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router: Router) {}  

  login(){
    //DEBERIA IR A UNA PAGINA DE HOME!!
    // this.router.navigate(['dashboard', 'home'])
    
    this.router.navigate(['dashboard', 'students'])

    
  }

  verifyToken(){}

  getUser(){}
  
}
