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
} from '@ionic/angular/standalone';
import { DataService } from 'src/app/services/data.service';
import { addIcons } from 'ionicons';
import {
  arrowBackOutline,
  cameraOutline,
  createOutline,
  imageOutline,
  trashOutline,
} from 'ionicons/icons';
import { Router } from '@angular/router';
import { CommonServiceService } from 'src/app/services/common-service.service';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.page.html',
  styleUrls: ['./my-profile.page.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  standalone: true,
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
  constructor(
    public data: DataService,
    private router: Router,
    public common: CommonServiceService
  ) {
    addIcons({
      arrowBackOutline,
      createOutline,
      trashOutline,
      cameraOutline,
      imageOutline,
    });
  }

  loginTypeData: any | [];
  formattedBirthDate!: string;
  formattedCreatedDate!: string;
  ngOnInit() {
    this.data.getDataUserType().subscribe((res) => {
      this.loginTypeData = res;
      this.formattedBirthDate = this.formatDate(this.loginTypeData?.birthDate);
      this.formattedCreatedDate = this.formatDate2(
        this.loginTypeData?.bankdetails[0].crtDate
      );
    });

    //use for when page load then call tab 1 and set color
    setTimeout(() => {
      const defaultButton = document.querySelector(
        'ion-segment-button[value="buttons"]'
      );
      if (defaultButton) {
        (defaultButton as HTMLElement).click();
      }
    }, 0);
    this.common.loadSelectedLangs();
    const storedImageUrl = localStorage.getItem('profileImageUrl');
    // if (storedImageUrl) {
    //   this.profileImageUrl = storedImageUrl;
    // }
  }
  basicInfo!: boolean;
  aboutMe!: boolean;
  bankDetails!: boolean;
  languages!: boolean;
  specialization!: boolean;
  gallery!: boolean;
  basicInfoFun() {
    this.basicInfo = true;
    this.aboutMe = false;
    this.bankDetails = false;
    this.languages = false;
    this.specialization = false;
    this.gallery = false;
  }
  aboutMeFun() {
    this.basicInfo = false;
    this.aboutMe = true;
    this.bankDetails = false;
    this.languages = false;
    this.specialization = false;
    this.gallery = false;
  }
  bankDetailsFun() {
    this.basicInfo = false;
    this.aboutMe = false;
    this.bankDetails = true;
    this.languages = false;
    this.specialization = false;
    this.gallery = false;
  }
  languagesFun() {
    this.basicInfo = false;
    this.aboutMe = false;
    this.bankDetails = false;
    this.languages = true;
    this.specialization = false;
    this.gallery = false;
  }
  specializationFun() {
    this.basicInfo = false;
    this.aboutMe = false;
    this.bankDetails = false;
    this.languages = false;
    this.specialization = true;
    this.gallery = false;
  }
  galleryFun() {
    this.basicInfo = false;
    this.aboutMe = false;
    this.bankDetails = false;
    this.languages = false;
    this.specialization = false;
    this.gallery = true;
  }
  goBack() {
    this.router.navigate(['/sign-in-success']);
  }
  addLanguage() {
    this.router.navigate(['/edit-profile']);
  }

  //formatting date
  formatDate(dateTimeString: string): string {
    if (!dateTimeString) return '';
    const [datePart] = dateTimeString.split(' ');
    const [year, month, day] = datePart.split('-');
    return `${day}-${month}-${year}`;
  }
  formatDate2(dateTimeString: string): string {
    const dateObj = new Date(dateTimeString);
    const day = String(dateObj.getDate()).padStart(2, '0');
    const month = String(dateObj.getMonth() + 1).padStart(2, '0');
    const year = dateObj.getFullYear();
    return `${day}-${month}-${year}`;
  }

  //profile photo choose or change
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;
  @ViewChild('profileImg') profileImg!: ElementRef<HTMLImageElement>;

  triggerFileInput() {
    this.fileInput.nativeElement.click();
  }

  onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    const file = input.files ? input.files[0] : null;
    if (file) {
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
        // localStorage.setItem('profileImageUrl', imageUrl);
      },
      (error) => {
        console.log('error', error);
      }
    );
  }
}
