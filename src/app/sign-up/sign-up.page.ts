import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Capacitor } from '@capacitor/core';


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
  standalone:false
})
export class SignUpPage implements OnInit {
  email: string="";
  password: string="";
  photo:any;

  constructor(private authService: AuthService) {}

  checkPlatforWeb(){
    if (Capacitor.getPlatform()=='web') return true;
    return false;
  }

  signUp() {
    this.authService.signUp(this.email, this.password);
  }
  async addPhotoToGallery() {
    const image = await Camera.getPhoto({
      quality: 90,
      source:CameraSource.Prompt,
      width:600,
      resultType: this.checkPlatforWeb()? CameraResultType.DataUrl: CameraResultType.Uri
    });
    console.log('img',image)
    this.photo = image;
    if(this.checkPlatforWeb()) this.photo.webPath = image.dataUrl;
  }
  ngOnInit() {
  }

}
