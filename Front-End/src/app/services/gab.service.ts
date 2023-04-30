import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Gab } from '../models/gab.model';

@Injectable({
  providedIn: 'root'
})
export class GabService {

  constructor(private http :HttpClient) { }

  private baseUrl = environment.url+'api'; // URL du backend Spring Boot
  gab :Gab ;

  
  getGabs(): Observable<Gab[]> {
    return this.http.get<Gab[]>(this.baseUrl + '/gabs');
  }


  updateGab(gabId: number, gab: Gab): Observable<Gab> {
    return this.http.put<Gab>(this.baseUrl + '/gab/' + gabId, gab);
  }

  deleteGabsByIds(ids: number[]) {
    const options = {
      headers: {
        'Content-Type': 'application/json'
      },
      body: ids 
      
    };
    return this.http.delete(this.baseUrl + '/gabs', options);
  }

}
