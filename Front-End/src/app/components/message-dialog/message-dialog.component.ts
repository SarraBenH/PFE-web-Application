import { Component, OnInit ,Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Message } from 'src/app/models/message.model';
import { MessageService } from 'src/app/services/message.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-message-dialog',
  templateUrl: './message-dialog.component.html',
  styleUrls: ['./message-dialog.component.scss']
})
export class MessageDialogComponent implements OnInit {
    textareaContent: string = '';

    constructor(private dialogRef: MatDialogRef<MessageDialogComponent> , private messageService:MessageService, @Inject(MAT_DIALOG_DATA) public dialogData: any){
      

    }
    ngOnInit(): void {
        
    }
    onNoClick(){
    this.dialogRef.close() ;
    }

    sendMessage(){
      const now: Date = new Date();
      let message: Message = new Message(this.textareaContent,this.dialogData.source,this.dialogData.target, now.toISOString())
      this.messageService.createMessage(message).subscribe((result)=>{},()=>{
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong!'
        })
      },()=>{
        Swal.fire(
          'Success!',
          'Message has been delivered successfully!',
          'success'
        )
      })
    }
}