import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ICellRendererParams } from 'ag-grid-community';
import { GabDialogComponent } from '../gab-dialog/gab-dialog.component';




@Component({
  selector: 'app-btn-custom',
  template: `
  <span>
    <button (click)="openDialog()" style="width:100%" [ngClass]="'btn-sm btn-' + cellColor" >{{this.cellValue}}</button>
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
    this.cellColor=this.getColorToDisplay();
    this.data =params.data ;
  }
  getValueToDisplay(params: ICellRendererParams): any {
    return params.valueFormatted ? params.valueFormatted : params.value;
  }
  getColorToDisplay(){
    switch (this.cellValue) {
      case "OUT_OF_SERVICE":
        return "danger"
      
      case "IN_SERVICE":
        return "success"
        
      case "FUNCTIONAL":
        return "primary"
      
      default:
        return "warning"

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
x
}
