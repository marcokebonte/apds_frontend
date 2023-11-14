import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  //private token!: string;
  private readonly BASE_URL = 'http://localhost:3000/api/users';

  
  constructor(private http: HttpClient) { }



  get isLoggedIn(): boolean{
    const token = localStorage.getItem('x-auth-token');
    return token ? true : false;
  }



  get token(){
    return localStorage.getItem('x-auth-token');
  }


   signup(
    username: string,
    firstName: string,
    lastName: string,
    password: string
    ) {
      return this.http.post(`${this.BASE_URL}/api/user`,{
        username,
        firstName,
        lastName,
        password,
      });
   }



  login (username: string, password: string){
    return this.http.post(`${this.BASE_URL}/api/auth`, {username,password});
    }
  

  getToken(){
    return localStorage.getItem('x-auth-token');
  }

  logout(): void {
    localStorage.removeItem('x-auth-token');
  }

}

