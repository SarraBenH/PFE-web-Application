import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { MessageDialogComponent } from 'src/app/components/message-dialog/message-dialog.component';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  positions:string[]=[
    "Technical maintenance team" ,
    "IT Team" ,
    "The Monetics business team",
    "The Monetics server team" ,
    "CEO of the bank",
    "Central Director of IT Projects"]
 user :User ;
 isLoading=false ;
 EditProfileForm: FormGroup;
 progress = 0 ;
 image="";
 checkSessionId=false;
  constructor(private userService : UserService ,private dialog:MatDialog, private route: ActivatedRoute, private fb: FormBuilder) {
    this.EditProfileForm = this.fb.group({
      lastName: ['',],
      firstName: ['', ],
      email: ['', ],
      city: ['', ],
      phoneNumber: ['',],
      position:['' ,]
      })
   }

  ngOnInit() {


    const userId = this.route.snapshot.paramMap.get('id');
    this.isLoading=true;
    this.userService.getUserById(userId).subscribe((result)=>{
      this.user=result?.data ;
      this.isLoading=false ;
      this.progress = result?.progress ;
      this.EditProfileForm.patchValue({
        firstName: this.user?.firstName,
        lastName: this.user?.lastName,
        email: this.user?.email,
        city: this.user?.city,
        phoneNumber: this.user?.phoneNumber,
        position: this.user?.position,
      });
    } , ()=>{},()=>{
      this.checkSessionId = localStorage.getItem('sessionId') === this.user.sessionId ;

    }
    );

  const currentUserId = localStorage.getItem("userId");
    this.isLoading=true;
    this.userService.getUserById(currentUserId).subscribe((result)=>{
      this.isLoading=false ;
      this.progress = result?.progress ;
      this.image = result?.data?.image
      this.userService.updateUserVariable(result?.data)  ;
    } , ()=>{},()=>{
    }
    );

  }

  openMessageDialog(){
    const dialogRef = this.dialog.open(MessageDialogComponent , {data: 
      {
        "source": localStorage.getItem("userId"),
        "target": this.user?.id,
        "image": this.image
      }
    });

    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        console.log('confirm');
      }
    });
  }





}
