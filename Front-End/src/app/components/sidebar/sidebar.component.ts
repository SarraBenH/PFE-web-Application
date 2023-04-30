import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
    withId : boolean ;
}
export const ROUTES: RouteInfo[] = [
    { path: '/dashboard', title: 'Dashboard',  icon: 'ni-tv-2 text-primary', class: '' , withId :true},
    { path: '/icons', title: 'Global View',  icon:'ni-planet text-blue', class: '' , withId : true},
   // { path: '/maps', title: 'GABs',  icon:'ni-pin-3 text-orange', class: '' },
    { path: '/user-profile', title: 'User profile',  icon:'ni-single-02 text-yellow', class: '' , withId : true},
    { path: '/gabs', title: 'GABs',  icon:'ni-bullet-list-67 text-red', class: '' , withId : true},
    { path: '/transactions', title: 'Transactions',  icon:'ni-bullet-list-67 text-red', class: '' , withId : true},

    { path: '/login', title: 'Response Code',  icon:'ni-key-25 text-info', class: '' , withId :true },
    { path: '/register', title: 'Cash balance',  icon:'ni-circle-08 text-pink', class: '' , withId :true}, 
    { path: '/register', title: 'TPE Gateway',  icon:'ni-circle-08 text-pink', class: '', withId : true}
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  public menuItems: any[];
  public isCollapsed = true;
  id:string ;
  constructor(private router: Router , private authService:AuthService) { }


  ngOnInit() {
    let url=window.location.href ;
    let tab=url.split('/') ;
    let id=tab[tab.length -1] ;
    this.id=id ;
    this.authService.userId=id ;
    this.menuItems = ROUTES.filter(menuItem => menuItem);
    this.router.events.subscribe((event) => {
      this.isCollapsed = true;
   });
  }
}
