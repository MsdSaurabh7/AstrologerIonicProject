import {
  CUSTOM_ELEMENTS_SCHEMA,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  NavController,
} from '@ionic/angular/standalone';
import { DataService } from 'src/app/services/data.service';
import { Router } from '@angular/router';
import { addIcons } from 'ionicons';
import { arrowBackOutline, cameraOutline } from 'ionicons/icons';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.page.html',
  styleUrls: ['./my-profile.page.scss'],
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
  ],
})
export class MyProfilePage implements OnInit {
  constructor(public data: DataService, private router: Router) {
    addIcons({ arrowBackOutline, cameraOutline });
  }
  loginTypeData: any | [];
  ngOnInit() {
    this.data.getDataUserType().subscribe((res) => {
      this.loginTypeData = res;
      // console.log("login",this.loginTypeData);
      // console.log("data",this.loginTypeData.firstName)
    });
    // this.basicInfoFun();
    setTimeout(() => {
      const defaultButton = document.querySelector(
        'ion-segment-button[value="buttons"]'
      );
      if (defaultButton) {
        (defaultButton as HTMLElement).click();
      }
    }, 0);
    // this.triggerFileInput();
  }

  basicInfo!: boolean;
  notification!: boolean;
  accountDeactivate!: boolean;
  basicInfoFun() {
    this.basicInfo = true;
    this.notification = false;
    this.accountDeactivate = false;
  }
  notificationFun() {
    this.basicInfo = false;
    this.notification = true;
    this.accountDeactivate = false;
  }
  accountDeactivateFun() {
    this.basicInfo = false;
    this.notification = false;
    this.accountDeactivate = true;
  }
  goBack() {
    this.router.navigate(['/sign-in-success']);
  }
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;
  @ViewChild('profileImg') profileImg!: ElementRef<HTMLImageElement>;

  triggerFileInput() {
    this.fileInput.nativeElement.click();
  }

  onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    const file = input.files ? input.files[0] : null;
    if (file) {
      console.log('img', file);
      this.uploadImage(file);
    }
  }
  profileImageUrl: string = '../assets/img/profile.png';
  uploadImage(file: File) {
    this.data.uploadImageApi(file).subscribe(
      (res: any) => {
        console.log('imageresponse', res);
        const imageUrl = res.message;
        this.profileImageUrl = imageUrl;
        // const reader=new FileReader();
        // reader.onload=()=>{
        //   if(this.profileImg){
        //     this.profileImg.nativeElement.src=reader.result as string;
        //   }
        // };
        // reader.readAsDataURL(file);
      },
      (error) => {
        console.log('error', error);
      }
    );
  }
}
