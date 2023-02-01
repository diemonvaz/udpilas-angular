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

  submitFormRegistro() {
    if (this.form.invalid) {
      return;
    }
    //se podria crear una componente de gestion de usuarios de la web, desde donde el admin pueda crear super usuarios y demás
    let roles = [];
    roles.push('GUEST');
    this.authService
      .registro(this.form.get('email')?.value, this.form.get('password')?.value, roles)
      .subscribe((response) => {
        console.log(response);
        this.router.navigate(['']);
    });

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
