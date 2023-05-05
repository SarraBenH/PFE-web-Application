import { Component, OnInit, ViewChild } from '@angular/core';
import {FormBuilder, FormGroup,FormControl, Validators} from '@angular/forms';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';
import Swal from "sweetalert2";
import {NgxMatIntlTelInputComponent} from "ngx-mat-intl-tel-input"
import { Router } from '@angular/router';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  @ViewChild('phoneInput') phoneInput: NgxMatIntlTelInputComponent | undefined;
  positions:string[]=[
    "Technical maintenance team" ,
    "IT Team" ,
    "The Monetics business team", 
    "The Monetics server team" ,
    "CEO of the bank",
    "Central Director of IT Projects"]
    SignUpForm: FormGroup;
    hide=true;
    hideConfirm=true ;
    
  

 submitted=false ;
    
  constructor(private fb: FormBuilder , private userService:UserService , private router:Router) {
    
    this.SignUpForm = this.fb.group({
    lastName: ['', [Validators.required]],
    firstName: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    city: ['', ],
    phoneNumber: ['', [Validators.required,Validators.pattern('[- +()0-9]+')]],
    password: ['', [Validators.required, Validators.minLength(8) , this.passwordValidator]],
    confirmPassword: ['', [Validators.required ]],
    position:['' ,]
    }
    , {
      validator: this.MustMatch('password', 'confirmPassword')
    });
    
    
   }

    // Getter pour un accès facile aux champs de formulaire
    get f() { return this.SignUpForm.controls; }

    // Méthode appelée lors de la soumission du formulaire
    signUp() {
      this.submitted = true;
  
      // Arrêter si le formulaire n'est pas valide
      if (this.SignUpForm.invalid) {
        return;
      }
  
      const newUser: User = User.fromJson(this.SignUpForm.value) ;
      newUser.image="assets/img/user.png"

       this.userService.createUser(newUser).subscribe((result )=>{


},(error)=>{
  if(error.error.message === "Email already exist"){
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Email already exist!'
    })
  }
 
},()=>{
  Swal.fire(
    'Good job!',
    'User has been created successfully!',
    'success'
  ).then(()=>{this.router.navigate(["/login"])})

}
)
          
    }
   MustMatch(controlName: string, matchingControlName: string): any {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];
      if (matchingControl.errors && !matchingControl.errors.mustMatch) {
        return;
      }
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ mustMatch: true });
      } else {
        matchingControl.setErrors(null);
      }
    }
   }

   passwordValidator(control: FormControl): {[s: string]: boolean} {
    // Match at least 2 uppercase letters, 2 lowercase letters, 2 digits, and 1 special character
    const pattern = /^(?=.*[A-Z].*[A-Z])(?=.*[a-z].*[a-z])(?=.*\d.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])(?=.{8,})/
    if (!control.value.match(pattern)) {
      return {invalidPassword: true};
    }
  }

  ngAfterViewInit() {
    if (this.phoneInput) {
      this.phoneInput.selectedCountry = this.phoneInput.getCountry("tn");
    }
  }

  ngOnInit() {
  }

}
