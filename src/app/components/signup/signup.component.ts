import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  signupForm!: FormGroup;
  isPasswordSame: boolean = true;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.signupForm = new FormGroup({
      firstname: new FormControl('', Validators.required),
      lastname: new FormControl('', Validators.required),
      userEmail: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      confirmPassword: new FormControl('', Validators.required),
    });
  }

  onSignup() {
    const firstname = this.signupForm.value.firstname;
    const lastname = this.signupForm.value.lastname;
    const userEmail = this.signupForm.value.userEmail;
    const password = this.signupForm.value.password;
    const confirmPassword = this.signupForm.value.confirmPassword;

    if (password === confirmPassword) {
      // this.authService
      //   .signup(firstname, lastname, userEmail, password)
      //   .subscribe((data) => {
      //     this.router.navigate(['/products']);
      //   });
      setTimeout(() => {
        window.location.reload();
      }, 200);
    } else {
      this.isPasswordSame = false;
    }
  }

  reloadPage() {
    window.location.reload();
  }
}
