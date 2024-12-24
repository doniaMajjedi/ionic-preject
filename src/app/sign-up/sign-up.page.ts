import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
  standalone:false
})
export class SignUpPage implements OnInit {
  email: string="";
  password: string="";

  constructor(private authService: AuthService) {}

  signUp() {
    this.authService.signUp(this.email, this.password);
  }
  ngOnInit() {
  }

}
