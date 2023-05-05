import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { Observable, Subscriber } from 'rxjs';
import { GabService } from 'src/app/services/gab.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.scss']
})
export class MapsComponent implements OnInit {

  constructor(private userService : UserService, private gabService:GabService) { }

  ngOnInit() {
    const userId = localStorage.getItem("userId");

    if(userId !== null){
      this.userService.getUserById(userId).subscribe((result)=>{
        if(result !==null){
          this.userService.updateUserVariable(result.data)  ;
        }

      });

    }
  }

  map: any;

  public ngAfterViewInit(): void {
    this.loadMap();
  }



  private loadMap(): void {
    this.map = L.map('map').setView([0, 0], 1);
    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      maxZoom: 18,
      id: 'mapbox/streets-v11',
      tileSize: 512,
      zoomOffset: -1,
      accessToken:  'pk.eyJ1Ijoicm9kcmlnb2thbWFkYSIsImEiOiJjbGZ5NTVhenAwanBzM3Fta3Y3b29temE5In0.PkdHrkHBrx9RALYhyLMRxA',
    }).addTo(this.map);
    this.map.flyTo([34.85,10.15], 7);
    
    const icon = L.icon({
      iconUrl: 'https://res.cloudinary.com/rodrigokamada/image/upload/v1637581626/Blog/angular-leaflet/marker-icon.png',
      shadowUrl: 'https://res.cloudinary.com/rodrigokamada/image/upload/v1637581626/Blog/angular-leaflet/marker-shadow.png',
      popupAnchor: [13, 0],
    });

    const marker = L.marker([34.85,10.15], { icon }).bindPopup('Angular Leaflet');
    marker.addTo(this.map);
    this.gabService.getGabs().subscribe((result)=>{
      // Add a marker with the name of the city
      if(result.length > 0) {
        result.forEach((gab) => {
          const city = gab.address;
          const url = `https://nominatim.openstreetmap.org/search?format=json&q=${city}`;
          fetch(url)
            .then(response => response.json())
            .then(data => {
              if(data){
                console.log(data)
                const lat = data[0].lat;
                const lon = data[0].lon;
                const marker = L.marker([lat, lon],{icon}).addTo(this.map);
                marker.bindPopup(city);
              }
            });
                console.log(result)
              })

        } })
      }

  }


