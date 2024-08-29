import { CUSTOM_ELEMENTS_SCHEMA, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  callSharp,
  chatbubbleEllipsesSharp,
  flowerSharp,
  homeSharp,
  menuOutline,
  notificationsOutline,
  searchOutline,
  starSharp,
  videocamSharp,
  walletOutline,
} from 'ionicons/icons';
import { Router } from '@angular/router';
import { BannerComponent } from './banner/banner.component';
import { DataService } from '../services/data.service';
import { CommonServiceService } from '../services/common-service.service';

@Component({
  selector: 'app-sign-in-success',
  templateUrl: './sign-in-success.page.html',
  styleUrls: ['./sign-in-success.page.scss'],
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    BannerComponent,
  ],
})
export class SignInSuccessPage implements OnInit {
  slides: any[] = [];
  home = true;
  chat!: boolean;
  live!: boolean;
  call!: boolean;
  pooja!: boolean;
  object: any | [];
  constructor(private router: Router, public data: DataService, public commonService:CommonServiceService) {
    addIcons({
      menuOutline,
      searchOutline,
      walletOutline,
      notificationsOutline,
      homeSharp,
      chatbubbleEllipsesSharp,
      videocamSharp,
      callSharp,
      flowerSharp,
      starSharp,
    });
  }

  ngOnInit() {
    this.setActiveButton(1);
    this.slides = [
      { banner: 'assets/img/banner/11.jpeg' },
      { banner: 'assets/img/banner/3.jpg' },
      { banner: 'assets/img/banner/cab.jpg' },
    ];
  }

  handleRefresh(event: any) {
    setTimeout(() => {
      event.target.complete();
    }, 2000);
  }

  // api=this.data.api;
  fetchApi(type: string) {
    // this.http.get(this.api+type)
    // .subscribe((res)=>{
    //   this.object=res;
    // });
    this.data.getData(type).subscribe((res) => {
      this.object = res;
    });
  }

  openSignInPage() {
    this.router.navigate(['/home']);
  }

  activeButtonId: number | null = null;
  setActiveButton(buttonId: number) {
    this.activeButtonId = buttonId;
    if (buttonId === 1) {
      this.home = true;
      this.chat = false;
      this.call = false;
    } else if (buttonId === 2) {
      this.chat = true;
      this.home = false;
      this.call = false;
    } else if (buttonId === 3) {
      this.live = true;
      this.chat = false;
      this.home = false;
      this.call = false;
    } else if (buttonId === 4) {
      this.call = true;
      this.home = false;
      this.chat = false;
    } else if (buttonId === 5) {
      this.pooja = true;
      this.call = false;
      this.home = false;
      this.chat = false;
      console.log('typechodu', this.commonService.userType);
      console.log('num', this.data.mobileNum);
      if (this.commonService.userType === 'Astrologer') {
        this.router.navigate(['/astro/my-profile']);
      } else if (this.commonService.userType === 'User') {
        this.router.navigate(['/user/my-profile']);
      }
    }
  }

  isActive(buttonId: number): boolean {
    return this.activeButtonId === buttonId;
  }
  // demo(){
  //   const login_token =(localStorage.getItem('loginData'));
  //   const user = login_token ? JSON.parse(login_token) : null;
  //   console.log("token",login_token);
  // }
}
