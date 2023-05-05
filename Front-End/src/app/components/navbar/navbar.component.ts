import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ROUTES } from '../sidebar/sidebar.component';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';
import { AlertService } from 'src/app/services/alert.service';
import { Alert } from 'src/app/models/alert.model';
import { Title } from '@angular/platform-browser';
import { GabService } from 'src/app/services/gab.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  public focus;
  public listTitles: any[];
  public location: Location;
  user: User ;
  showNotificationsPanel= false ;
  viewAll=false ;
  alerts !:Alert[] ;
  filteredAlerts: any[];
  searchText ="" ;
  alertCount = 0 ;
  originalTitle : string ;
  PROCESSED_ALERTS_KEY = 'processedAlerts';
  interval :any ;
  interval2 : any ;
  interval3 :any;
  options = [];


  constructor(location: Location,  private element: ElementRef, private router: Router , private authService:AuthService , private userService :UserService , private alertService :AlertService ,
    private titleService : Title , private gabService :GabService ) {
    this.location = location;
    this.originalTitle=this.titleService.getTitle();
  }

  Logout(){
    this.authService.logout();
  }
  ngOnInit() {
    this.listTitles = ROUTES.filter(listTitle => listTitle);

    this.userService.user$.subscribe(value => {
    this.user = value;
    });
    this.alertService.getAlerts().subscribe((result) =>{
      this.alerts=result ;
      this.filteredAlerts =  this.alerts.sort(function compare(a, b) {
        var dateA = new Date(a.dateAlerte);
        var dateB = new Date(b.dateAlerte);
        return dateB.getTime() - dateA.getTime() ;
      });
      this.alertCount=this.alerts.length ;

    })

    this.interval = setInterval(()=>{
      this.alertService.getAlerts().subscribe((result) =>{
        this.alerts=result ;
        this.filteredAlerts =  this.alerts.sort(function compare(a, b) {
          var dateA = new Date(a.dateAlerte);
          var dateB = new Date(b.dateAlerte);
          return dateB.getTime() - dateA.getTime() ;
        });

        // user didn t mark any alert as read , we sent an email with all the alert
        if(this.user?.alert_ids == null) {
          this.user.alert_ids = [] ;
        }
        if(this.alerts.length - this.user?.alert_ids?.length == 0) {
          this.titleService.setTitle(this.originalTitle) ;
          }
          else{
            this.titleService.setTitle(`New alerts (${this.alerts.length - this.user?.alert_ids?.length})`) ;

          }

        const processedAlerts: number[] = this.alerts.filter((alert)=>alert.emailSent === true).map((alert)=> alert.id) ;
        const newAlerts = this.alerts.filter((alert)=> !processedAlerts.includes(alert.id)) ;
        if(newAlerts.length > 0){
          this.alertService.sendEmail(newAlerts).subscribe((result)=>{
          let newAlertIds =newAlerts.map((alert)=> alert.id)
          this.alertService.updateAlertEmail(newAlertIds).subscribe();
        }) ;

       }

      })
    } , 600000 //600000

    )

    this.interval2 = setInterval(()=>{
      this.alertService.getAlerts().subscribe((result)=>{
        if(this.user.alert_ids !== null && this.user.alert_ids?.length>0){
          let alertsSeen = result.filter((alert)=>this.user.alert_ids.includes(alert.id))
          const oneWeekAgo = new Date();
          oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
          let expiredSeenAlerts = alertsSeen.filter(alert => new Date(alert.dateAlerte) < oneWeekAgo).map((alert)=>alert.id)
          if(expiredSeenAlerts.length>0){
            this.alertService.deleteAlertsByIds(expiredSeenAlerts).subscribe(()=>{});            
            this.user.alert_ids = this.user?.alert_ids.filter((id)=>!expiredSeenAlerts.includes(id))
            this.alerts = this.alerts.filter((alert)=>!expiredSeenAlerts.includes(alert.id))
            this.filteredAlerts = this.filteredAlerts.filter((alert)=>!expiredSeenAlerts.includes(alert.id))
            this.userService.updateUser(this.user.id , this.user).subscribe((userResult) =>{
              this.user=userResult;
              
            }) ;            
          }
        }
      })

       
    } , 600000 //600000

    )    
    this.interval3 = setInterval(()=>{
      this.gabService.getGabs().subscribe((result) =>{
         if(result.length > 0) {
          let nbGabOutOfService = result.filter((gab)=> gab.etatGab === "OUT_OF_SERVICE").length ;
          if((nbGabOutOfService / result.length) * 100 > 35 && !this.containCriticalAlert()){
            const now: Date = new Date();
           
            let alert :Alert= new Alert("Gabs out of service > 35% : Critical alert!" , now.toISOString() , 'CRITICAL' ,null  , true) ;
            this.alertService.createAlert(alert).subscribe((result2)=> {
              if(!this.alerts.includes(result2)) {
                this.alerts.push(result2) ;
                this.filteredAlerts =  this.alerts.sort(function compare(a, b) {
                var dateA = new Date(a.dateAlerte);
                var dateB = new Date(b.dateAlerte);
                return dateB.getTime() - dateA.getTime() ;
                });
                this.alertService.sendEmail([alert]).subscribe() ;
              }
              
            }) ;

          }
          else if(this.containCriticalAlert() && (nbGabOutOfService / result.length) * 100 <= 35) {
            let criticalAlert = this.filteredAlerts.filter((alert)=> alert.etatAlerte === "CRITICAL");
            this.alertService.deleteAlert(criticalAlert[0].id).subscribe();
            this.alerts = this.alerts.filter((alert)=> alert.etatAlerte !== "CRITICAL") ;
            this.filteredAlerts =  this.alerts.sort(function compare(a, b) {
              var dateA = new Date(a.dateAlerte);
              var dateB = new Date(b.dateAlerte);
              return dateB.getTime() - dateA.getTime() ;
            });
            if(this.user.alert_ids!==null && this.user.alert_ids?.includes(criticalAlert[0].id)){
              this.user.alert_ids = this.user.alert_ids.filter((id)=>id !== criticalAlert[0].id);
              this.userService.updateUser(this.user.id , this.user).subscribe((userResult) => this.user=userResult ) ;
            }

          }
         }
        });

       
    } , 600000 //600000

    )


  }
  containCriticalAlert(){
  return  this.alerts.filter((alert)=> alert.etatAlerte === "CRITICAL").length > 0 ;
  }

  getTitle(){
    var titlee = this.location.prepareExternalUrl(this.location.path());
    if(titlee.charAt(0) === '#'){
        titlee = titlee.slice( 1 );
    }

    for(var item = 0; item < this.listTitles.length; item++){
        if( titlee.startsWith(this.listTitles[item].path) ){
            return this.listTitles[item].title;
        }
    }
    return 'User Profile';
  }

  showNotifications(){
    this.showNotificationsPanel= !this.showNotificationsPanel ;
  }

  showAllNotifications(){
  this.viewAll=true ;

}

getStatus(notification:Alert){
  if(notification.etatAlerte){
    switch (notification.etatAlerte) {
      case "UNTREATED":
        return "assets/img/icons/common/yellow.png"

      case "TREATED":
        return "assets/img/icons/common/orange.png"

      case "UNRESOLVED":
        return "assets/img/icons/common/red.png"
      case "CRITICAL" :
        return "assets/img/icons/common/critical.png"
      default:
        return "assets/img/icons/common/green.png"

  }
     }
}

markAsRead(notification: Alert) {
  if(this.user.alert_ids?.length == 0 || this.user.alert_ids === null) {
    this.user.alert_ids =[notification.id] ;

  }
  else  if(!this.user.alert_ids?.includes(notification.id)) {
    this.user.alert_ids.push(notification.id) ;

  }
  if(this.alerts.length - this.user?.alert_ids?.length == 0) {
    this.titleService.setTitle(this.originalTitle) ;
    }
    else {
      this.titleService.setTitle(`New alerts (${this.alerts.length - this.user?.alert_ids?.length})`) ;

    }
  this.userService.updateUser(this.user.id , this.user).subscribe((userResult) => this.user=userResult ) ;

}


filterNotifications() {
  if (this.searchText) {
    this.filteredAlerts = this.alerts.filter(notification => {
      return notification.message.toLowerCase().includes(this.searchText.toLowerCase());
    });

  } else {
    this.filteredAlerts = this.alerts;
  }
}
  searchProfiles(e){
    let searchInput = e.target.value;
    if(searchInput.length>=3){
      this.userService.getUserByName(searchInput).subscribe((result: User[])=>{
        //let suggestions = result.map((user)=> user.firstName + " " + user.lastName);
        this.options = result.filter((user)=> user.id !== this.user.id);
      })
    }
  }
  goToProfile(id){
    this.router.navigate(['/profile',id]);
  }
ngOnDestroy(){
  clearInterval(this.interval) ;
}
}
