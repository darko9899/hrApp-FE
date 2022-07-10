import { HttpErrorResponse } from '@angular/common/http';
import { CssSelector } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent } from '../app.component';
import { NewUser } from '../newUser';
import { AuthenticationService } from '../service/authentication.service';
import { User } from '../user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username: any= document.getElementById('username');
  password:any = document.getElementById('password');
  invalidLogin = false
  user!: NewUser;
  loggedUser!: User;

  constructor(private router: Router,
    private loginservice: AuthenticationService) { }

  ngOnInit() {
  }

  checkLogin() {
    // window.location.reload();
    this.username = document.getElementById('username');
    this.password = document.getElementById('password');
    this.user = {username: this.username.value, password:this.password.value}

    this.loginservice.authenticate(this.user).subscribe(
      (response: User) => {
        this.loggedUser = response;
        console.log(this.loggedUser);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );

    if (this.loggedUser.username!="") {
      

      this.router.navigate([''])
      this.invalidLogin = false
      
    } else{
      this.invalidLogin = true
    }
  }
}