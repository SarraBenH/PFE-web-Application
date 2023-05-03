import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
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
 checkSessionId=false;
  constructor(private userService : UserService , private route: ActivatedRoute, private fb: FormBuilder) {

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



  }





}
