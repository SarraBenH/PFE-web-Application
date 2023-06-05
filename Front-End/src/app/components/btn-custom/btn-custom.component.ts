import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ICellRendererParams } from 'ag-grid-community';
import { GabDialogComponent } from '../gab-dialog/gab-dialog.component';




@Component({
  selector: 'app-btn-custom',
  template: `
  <span>
    <button (click)="openDialog()" style="width:100%" [ngClass]="'btn-sm btn-' + cellColor" >{{this.getStatusGab()}}</button>
  </span>`,
  styleUrls: ['./btn-custom.component.scss']
})
export class BtnCustomComponent implements OnInit {
    cellValue ='' ;
    cellColor='' ;
    data  ;
  
  constructor(private dialog :MatDialog) { }


  ngOnInit() {
  }
  agInit(params: ICellRendererParams): void {
    this.cellValue=this.getValueToDisplay(params);
    this.data =params.data ;
    this.cellColor=this.getColorToDisplay();

  }
  getValueToDisplay(params: ICellRendererParams): any {
    return params.valueFormatted ? params.valueFormatted : params.value;
  }
  getColorToDisplay(){

    if(this.data.statutGab.toLowerCase()==='1' && Number(this.data.etatSuppCoffre) > 1  && Number(this.data.jdab) > 1 && Number(this.data.etatCoffre) >1){
      return 'black' ;
    }
    switch (this.cellValue) {
      case "2":
        return "danger"
      
      case "1":
        return "success"
        
      case "4":
        return "warning"
      
      case "3":
          return "info"

      case "6":
            return "primary"
        
      default:
        return "danger"

  } 
  }
  
  openDialog(){
    const dialogRef = this.dialog.open(GabDialogComponent , {data:this.data});

    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        console.log('confirm');
      }
    });
  }
  getStatusGab() {
    if(this.data.statutGab.toLowerCase()==='1' && Number(this.data.etatSuppCoffre) > 1  && Number(this.data.jdab) > 1 && Number(this.data.etatCoffre) >1){
      return 'Critical' ;
    }
    switch (this.data.statutGab) {
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
