import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  providers: [AuthService],
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form = new FormGroup({
    email: new FormControl(null, Validators.required),
    password: new FormControl(null, Validators.required),
  });

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }


  submitFormLogin() {
    if (this.form.invalid) {
      return;
    }
    this.authService
      .login(this.form.get('email')?.value, this.form.get('password')?.value)
      .subscribe((response) => {
        this.router.navigate(['']);
    });

  }


}
