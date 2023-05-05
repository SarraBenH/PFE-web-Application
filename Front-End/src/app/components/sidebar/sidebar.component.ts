import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    { path: '/dashboard', title: 'Dashboard',  icon: 'ni-tv-2 text-primary', class: ''},
   // { path: '/icons', title: 'Global View',  icon:'ni-planet text-blue', class: ''},
    { path: '/user-profile', title: 'User profile',  icon:'ni-single-02 text-yellow', class: '' },
    { path: '/gabs', title: 'GABs',  icon:'ni-bullet-list-67 text-red', class: '' },
    { path: '/transactions', title: 'Transactions',  icon:'ni-bullet-list-67 text-red', class: ''},
    { path: '/maps', title: 'Map View',  icon:'ni-pin-3 text-orange', class: '' },

    //{ path: '/login', title: 'Response Code',  icon:'ni-key-25 text-info', class: '' },
    //{ path: '/register', title: 'Cash balance',  icon:'ni-circle-08 text-pink', class: '' }, 
    //{ path: '/register', title: 'TPE Gateway',  icon:'ni-circle-08 text-pink', class: ''}
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
