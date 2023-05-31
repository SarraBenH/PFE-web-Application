import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { Observable, Subscriber } from 'rxjs';
import { GabService } from 'src/app/services/gab.service';
import { UserService } from 'src/app/services/user.service';
import { HttpClient } from '@angular/common/http';
import 'leaflet-easybutton';
import { Gab } from 'src/app/models/gab.model';

@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.scss']
})
export class MapsComponent implements OnInit {
  markers :any[];
  constructor(private userService : UserService, private gabService:GabService , private http : HttpClient) { }
  map:any
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


  public ngAfterViewInit(): void {
    this.loadMap();
  }
  
  getColorToDisplay(etat: string){
    switch (etat.toLowerCase()) {
      case "2":
        return "red"
      
      case "1":
        return "green"
        
      case "3":
        return "blue"

      case "4":
          return "orange"
          
      case "6":
          return "pink"
      
      default:
        return "black"

  } 
  }


  private loadMap(): void {
    this.map = L.map('map').setView([0, 0], 1);
    L.easyButton('fa-crosshairs fa-lg cssbtn', function(btn,map){
      var  group = new L.FeatureGroup();
      map.eachLayer((layer)=>{
        if(layer instanceof L.Marker){
          group.addLayer(layer)
        }
      })
      // set the map view to the bounds of all markers
      map.fitBounds(group.getBounds(),{maxZoom:7,animate:true,duration:0.2});
    },"center","centerBtn").addTo(this.map);
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

    this.gabService.getGabs().subscribe((result)=>{
      // Add a marker with the name of the city
      if(result.length > 0) {
        this.markers =[];
        result.forEach((gab) => {
          if(gab.latitude !== '' && gab.longitude !== '' ) {
            const marker = L.marker([Number(gab.latitude.replace(',' , '.')), Number(gab.longitude.replace(',' , '.'))],{icon}).addTo(this.map).on("click",(e)=>{
              this.map.setView(e.latlng, 15);
            });
            this.markers.push(marker)
            const colorGab =  this.getColorToDisplay(gab.statutGab)
            marker.bindPopup(  "Gab ID : <b>" +
            gab.identifiant +
            "</b><br>"+
            "Gab Address : <b>" +
            gab.address +
            "</b><br>"+
            "Gab Brand : <b>" +
            gab.enseigne +
            "</b><br>"+
            `Gab Status : <b><span style='color:${colorGab}'>${this.getStatusGab(gab)}</span></b>`
                       
            );
          }
         
        
          }
          )

        } }
      )
      }

      getStatusGab(gab:Gab) {
        if(gab.statutGab.toLowerCase()==='1' && Number(gab.etatSuppCoffre) > 1  || Number(gab.JDAB) > 1 || Number(gab.etatCoffre) >1){
          return 'Critical' ;
        }
        switch (gab.statutGab) {
          case "1":
            return "IN SERVICE"
          
          case "2":
            return "OUT OF SERVICE"
            
          case "3":
            return "SUSPENDED"
      
          case "4":
            return "SUPERVISOR"
            
          case "6":
             return "OFF LINE"
             
          
          default:
            return ""
      
      } 
      
      }
      
  }


