import { Injectable } from '@angular/core';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { User } from '../models/user.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  
  private baseUrl = environment.url+'api/user'; // URL du backend Spring Boot
  user :User ;

  private userSubject = new BehaviorSubject<User>(null);
  user$ = this.userSubject.asObservable();
   
  private emailSubject = new BehaviorSubject<string>(null);
  email$ = this.emailSubject.asObservable();

  setEmail(email: string) {
    this.emailSubject.next(email);
  }
  updateUserVariable(newValue: User) {
    this.userSubject.next(newValue);
  }

  constructor(private http: HttpClient) { }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.baseUrl + '/');
  }

  getUserById(userId: string): Observable<any> {
    return this.http.get<User>(this.baseUrl+ '/'+ `${userId}` , { reportProgress: true, observe: 'events' }).pipe(
      map((event) => {
        if (event.type === HttpEventType.DownloadProgress) {
          const progress = Math.round((event.loaded / event.total) * 100);
          return { progress };
        } else if (event.type === HttpEventType.Response) {
          const data = event.body;
          return { data, progress: 100 };
        }
        return null;
      })
    );

  }

  createUser(user: User): Observable<User> {
    return this.http.post<User>(this.baseUrl + '/', user);
  }

  updateUser(userId: string, user: User): Observable<User> {
    return this.http.put<User>(this.baseUrl + '/' + userId, user);
  }

  deleteUser(userId: string): Observable<void> {
    return this.http.delete<void>(this.baseUrl + '/' + userId);
  }
  getUserByEmail(email :string):Observable<User> {
    return this.http.get<User>(this.baseUrl+ '/email/'+ `${email}`);
 
  }

  getUserByName(name :string):Observable<User[]> {
    return this.http.get<User[]>(this.baseUrl+ '/name/'+ `${name}`);
  }
}
