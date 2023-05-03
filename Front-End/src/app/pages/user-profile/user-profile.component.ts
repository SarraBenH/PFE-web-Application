import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
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
      this.userService.updateUserVariable(result?.data)  ;
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
  openBrowseFile() {
    if(this.checkSessionId){
      const input = document.createElement('input');
      input.type = 'file';
      input.accept = 'image/*';
      input.addEventListener('change', (event: any) => {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
        const base64String = reader.result.toString();
        this.user.image=base64String ;
        this.user.password=null ;
        this.isLoading=true;
        this.userService.updateUser(this.user.id, this.user).subscribe((result)=>{
          this.isLoading=false ;
          this.userService.updateUserVariable(result);

        });
        };
      });
      input.click();
    }

  }

  editProfile(){
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, update it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.isLoading=true;
        this.userService.updateUser(this.user.id, this.EditProfileForm.value).subscribe((result)=>{
          this.isLoading=false ;
          this.user =result ;
          this.userService.updateUserVariable(result);

        });
        Swal.fire(
          'Updated!',
          'Your profile has been updated.',
          'success'
        )
      }
    })

  }



}
