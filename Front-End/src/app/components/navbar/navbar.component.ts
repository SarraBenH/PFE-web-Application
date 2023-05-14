import { Component, OnInit, ElementRef, ViewChild, SimpleChanges } from '@angular/core';
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
import { MessageService } from 'src/app/services/message.service';
import { Message } from 'src/app/models/message.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit  {
  @ViewChild('notificationAudio', {static: true}) notificationAudio: ElementRef<HTMLAudioElement>;
  public focus;
  public listTitles: any[];
  public location: Location;
  user: User ;
  showNotificationsPanel= false ;
  showMessagesPanel= false ;
  viewAll=false ;
  viewAllMessages=false;
  alerts !:Alert[] ;
  messages !:Message[] ;
  filteredMessages: any[];
  filteredAlerts: any[];
  searchText ="" ;
  alertCount = 0 ;
  messageCount = 0;
  originalTitle : string ;
  interval :any ;
  interval2 : any ;
  interval3 :any;
  options = [];


  constructor(location: Location, private messageService:MessageService,  private element: ElementRef, private router: Router , private authService:AuthService , private userService :UserService , private alertService :AlertService ,
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
    if(this.user?.id){
      this.messageService.getMessagesByUserId(this.user?.id).subscribe((result) =>{
        this.messages=result ;
        this.messages.forEach((message)=>{
          this.userService.getUserById(message.source).subscribe((result)=>{
            if (result.data){
              message.displayNameSender = (result?.data?.firstName && result?.data?.lastName) ? 
              result.data.firstName + ' ' + result.data.lastName : "" ;
              message.displayImage =result.data.image  ;
            }
            
             
          }) ;
        })
        this.filteredMessages =  this.messages.sort(function compare(a, b) {
          var dateA = new Date(a.dateMessage);
          var dateB = new Date(b.dateMessage);
          return dateB.getTime() - dateA.getTime() ;
        });
        if(this.user?.message_ids !==null){
          this.messageCount = this.messages?.length - this.user?.message_ids?.length  
        }else{
          this.messageCount = this.messages?.length;  
        }
      })
    }
   
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
      this.messageService.getMessagesByUserId(this.user?.id).subscribe((result) =>{
        this.messages=result ;
        this.messages.forEach((message)=>{
          this.userService.getUserById(message.source).subscribe((result)=>{
             message.displayNameSender = result?.data?.firstName + ' ' + result?.data?.lastName ;
             message.displayImage =result?.data?.image  ;
             
          }) ;
        })
        this.filteredMessages =  this.messages.sort(function compare(a, b) {
          var dateA = new Date(a.dateMessage);
          var dateB = new Date(b.dateMessage);
          return dateB.getTime() - dateA.getTime() ;
        });
        if(this.user?.message_ids !==null){
          if(this.messages?.length - this.user?.message_ids?.length>this.messageCount){
            setTimeout(()=>{
              this.notificationAudio.nativeElement.play();
            })
            this.messageCount = this.messages?.length - this.user?.message_ids?.length
          }
        }else{
          if(this.messages?.length>this.messageCount){
            setTimeout(()=>{
              this.notificationAudio.nativeElement.play();
            })
            this.messageCount = this.messages?.length - this.user?.message_ids?.length
          }
        }
        
      })
    } , 10000

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

       
    } , 600000   //600000

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
    this.showMessagesPanel= false ;
  }

  showMessages(){
    this.showMessagesPanel= !this.showMessagesPanel ;
    this.showNotificationsPanel = false;
  }

  showAllMessages(){
    this.viewAllMessages=true ;
  
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

markAsMessageRead(message: Message) {
  if(this.user.message_ids?.length == 0 || this.user.message_ids === null) {
    this.user.message_ids =[message.id] ;

  }
  else  if(!this.user.message_ids?.includes(message.id)) {
    this.user.message_ids.push(message.id) ;

  }
 
  this.userService.updateUser(this.user.id , this.user).subscribe((userResult) => this.user=userResult ) ;
  Swal.fire({
    title: 'Message',
    html: `<div style="max-height:400px">${message.content}</div>` 
})

}

filterMessages() {
  if (this.searchText && this.searchText.length>=3) {
    this.userService.getUserByName(this.searchText).subscribe((users)=>{
      let foundUsersIds = users.map((user)=>user.id);
      this.filteredMessages = this.messages.filter(message => {
        return foundUsersIds.includes(message.source)
      });  
          
      },()=>{this.filteredMessages = [];},()=>{}) 
  } else {
    this.filteredMessages = this.messages;
  }
}


getMessageSourceAvatar(message){
  let source = message.source;
  this.userService.getUserById(source).subscribe((user)=>{
      return user.image;
  }) 

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

  deleteMessage(id){
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.messageService.deleteMessageById(id).subscribe(()=>{
  
        } ,
        ()=>{
  
        },
        ()=>{
          this.messageService.getMessagesByUserId(this.user?.id).subscribe((result) =>{
            this.messages=result ;
            this.filteredMessages =  this.messages.sort(function compare(a, b) {
              var dateA = new Date(a.dateMessage);
              var dateB = new Date(b.dateMessage);
              return dateB.getTime() - dateA.getTime() ;
            });
          })
          if(this.user?.message_ids !== null){
            this.user.message_ids = this.user.message_ids.filter((messageId)=>id!==messageId)
            this.userService.updateUser(this.user.id , this.user).subscribe((userResult) => this.user=userResult ) ;

          }          
        }
        )
  
      }
    })
  }
ngOnDestroy(){
  clearInterval(this.interval) ;
}
}
