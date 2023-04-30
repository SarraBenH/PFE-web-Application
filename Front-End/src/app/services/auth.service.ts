import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserService } from './user.service';
import { Title } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private sessionToken: string;
  private baseUrl = environment.url+'api/login'; 
  isLoggedInValue=false ;
  sessionExpiresAt ;
  userId ;

  constructor(private http: HttpClient , private titleService: Title, private router:Router , private userService : UserService) {
    
  }

  isAuthenticated(): boolean {
    let sessionId = localStorage.getItem('sessionId');
    const sessionExpiresAt = localStorage.getItem('sessionExpiresAt');
    if(sessionId === null){
      this.logout();

    }
    if (sessionExpiresAt) {
      const expiresAt = new Date(sessionExpiresAt);
      if (expiresAt < new Date()) {
        this.logout();
        this.isLoggedInValue =false ;
      } else {
        const expiresInMs = expiresAt.getTime() - new Date().getTime();
        this.isLoggedInValue =true ;
        //setTimeout(() => this.logout(), expiresInMs);
      }
    }
  return this.isLoggedInValue ;
  }

  login(email: string, password: string):Observable<any> {
    return this.http.post<any>(this.baseUrl ,{email,password}) ;
  }
  logout() {
    localStorage.removeItem('sessionId');
    localStorage.removeItem('sessionExpiresAt');
    localStorage.removeItem('userId');
    this.titleService.setTitle("Amen Bank Dashboard");

    this.router.navigate(['/login']);

  }

  
}
