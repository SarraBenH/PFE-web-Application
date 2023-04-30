import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
 hide=true;
 LoginForm: FormGroup;
 sessionId :string ;
 expiresAt: string ;
 isLoggedInValue= false ;
 userId:number ;


  constructor(private fb: FormBuilder, private authService:AuthService , private router :Router ,private userService :UserService ) {
    this.LoginForm = this.fb.group({
      email: ['', ],
      password: ['', ]

    })
    
  }

  SignIn(){
    this.authService.login(this.LoginForm.get("email").value, this.LoginForm.get("password").value).subscribe((result)=>{
      this.sessionId = result.sessionId;
      this.expiresAt = result.expiresAt
      localStorage.setItem('sessionId', this.sessionId);
      localStorage.setItem('sessionExpiresAt',this.expiresAt);
      localStorage.setItem('userId' , result.id);
      this.userId=result.id ;
    },
    (error)=>{
      this.authService.isLoggedInValue=false ;
      if(error.error.message === "Invalid email or password"){
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Email or password is incorrect'
        })
      }
    },()=>{
      this.authService.isLoggedInValue=true ;
      this.authService.userId=this.userId ;
      this.router.navigate(['/dashboard',this.userId]);

    }
    ) ;

  }



  ngOnInit() {
  }
  ngOnDestroy() {
  }

}
