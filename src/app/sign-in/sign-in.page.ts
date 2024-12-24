import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.page.html',
  styleUrls: ['./sign-in.page.scss'],
  standalone:false
})
export class SignInPage implements OnInit {

  email: string="";
  password: string="";

  constructor(private authService: AuthService,private router: Router) {}
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  signIn() {
    this.authService.signIn(this.email, this.password);
  }
  redirectToSignUp() {
    this.router.navigate(['sign-up']);
  }
}
