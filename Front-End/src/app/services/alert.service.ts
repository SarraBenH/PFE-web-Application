import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Alert } from '../models/alert.model';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  private baseUrl = environment.url+'api'; // URL du backend Spring Boot
  alert :Alert ;

  
  constructor(private http: HttpClient) { }

  getAlerts(): Observable<Alert[]> {
    return this.http.get<Alert[]>(this.baseUrl + '/alerts');
  }

  sendEmail(alerts) : Observable<any>{

    return this.http.post<any>('https://formspree.io/f/mgebpqep' , {
      email : 'sarrabenhaddada7@gmail.com' ,
      message: this.getMessage(alerts) ,

    })
  }
  createAlert(alert :Alert):Observable<Alert>{
   return this.http.post<Alert>(this.baseUrl + '/alert' , alert)
  }
  updateAlertEmail(ids : number[]) : Observable<any>{
   return this.http.post<any>(this.baseUrl + '/alerts/email' , {
    ids 
   }) 
  
  }
  private getMessage(alerts: Alert[]) : string  {
    let message ="" ;
    alerts.forEach((alert) =>{
      const date = moment(alert.dateAlerte);
      const formattedDate = date.format('MMM D, YYYY, h:mm A');
      message +=  `You have recieved new alert : ${alert.message} on ${formattedDate } with status ${alert.etatAlerte} \n ` 
      

    })
    return message ;
  }



}
