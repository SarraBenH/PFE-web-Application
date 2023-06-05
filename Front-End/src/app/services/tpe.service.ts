import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Tpe } from '../models/tpe.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TpeService {

  constructor(private http :HttpClient) { }

  private baseUrl = environment.url+'api'; // URL du backend Spring Boot
  tpe : Tpe

  
  getAllTpe(): Observable<Tpe[]> {
    return this.http.get<Tpe[]>(this.baseUrl + '/TPEs');
  }


  updateTpe(tpeId: number, tpe: Tpe): Observable<Tpe> {
    return this.http.put<Tpe>(this.baseUrl + '/tpe/' + tpeId, tpe);
  }

  deleteTpe(tpeId :number){
    return this.http.delete(this.baseUrl + '/tpe/'+tpeId)
  }

  deleteTpeByIds(ids: number[]) {
    const options = {
      headers: {
        'Content-Type': 'application/json'
      },
      body: ids 
      
    };
    return this.http.delete(this.baseUrl + '/TPEs', options);
  }
}
