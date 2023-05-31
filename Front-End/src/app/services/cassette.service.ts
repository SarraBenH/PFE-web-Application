import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Cassette } from '../models/cassette.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CassetteService {

  constructor(private http :HttpClient) { }

  private baseUrl = environment.url+'api'; // URL du backend Spring Boot
  cassette : Cassette

  
  getCassette(): Observable<Cassette[]> {
    return this.http.get<Cassette[]>(this.baseUrl + '/cassettes');
  }


  updateCassette(cassetteId: number, cassette: Cassette): Observable<Cassette> {
    return this.http.put<Cassette>(this.baseUrl + '/cassette/' + cassetteId, cassette);
  }

  deleteCassette(cassetteId :number){
    return this.http.delete(this.baseUrl + '/cassette/'+cassetteId)
  }

  deleteCassetteByIds(ids: number[]) {
    const options = {
      headers: {
        'Content-Type': 'application/json'
      },
      body: ids 
      
    };
    return this.http.delete(this.baseUrl + '/cassettes', options);
  }
}
