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
  options = [];


  constructor(location: Location,  private element: ElementRef, private router: Router , private authService:AuthService , private userService :UserService , private alertService :AlertService ,
    private titleService : Title ) {
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
    return 'Dashboard';
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
