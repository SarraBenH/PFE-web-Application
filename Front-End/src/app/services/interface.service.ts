import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Interface } from '../models/interface.model';

@Injectable({
  providedIn: 'root'
})
export class InterfaceService {

  constructor(private http :HttpClient) { }

  private baseUrl = environment.url+'api'; // URL du backend Spring Boot
  interface :Interface ;

  
  getInterfaces(): Observable<Interface[]> {
    return this.http.get<Interface[]>(this.baseUrl + '/interfaces');
  }


  updateInterface(gabId: number, gab: Interface): Observable<Interface> {
    return this.http.put<Interface>(this.baseUrl + '/interface/' + gabId, gab);
  }

  deleteInterfacesByIds(ids: number[]) {
    const options = {
      headers: {
        'Content-Type': 'application/json'
      },
      body: ids 
      
    };
    return this.http.delete(this.baseUrl + '/interfaces', options);
  }

}
