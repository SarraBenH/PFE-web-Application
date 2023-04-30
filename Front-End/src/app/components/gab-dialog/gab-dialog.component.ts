import { Component, OnInit ,Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Gab } from 'src/app/models/gab.model';


@Component({
  selector: 'app-gab-dialog',
  templateUrl: './gab-dialog.component.html',
  styleUrls: ['./gab-dialog.component.scss']
})
export class GabDialogComponent implements OnInit {

    constructor(private dialogRef: MatDialogRef<GabDialogComponent> , @Inject(MAT_DIALOG_DATA) public dialogData: Gab){
      

    }
    ngOnInit(): void {
        
    }
    onNoClick(){
    this.dialogRef.close() ;
    }
}