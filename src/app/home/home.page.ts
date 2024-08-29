import {
  CUSTOM_ELEMENTS_SCHEMA,
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton,
  IonLabel,
  IonButtons,
  IonImg,
} from '@ionic/angular/standalone';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { NgxMatTimepickerModule } from 'ngx-mat-timepicker';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { LoadingDialogPage } from '../loading-dialog/loading-dialog.page';
import { SuccessDialogPage } from '../success-dialog/success-dialog.page';
import { DataService } from '../services/data.service';
import { MatCheckbox } from '@angular/material/checkbox';
import { CommonServiceService } from '../services/common-service.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonLabel,
    IonButton,
    IonButtons,
    IonImg,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    NgxMatTimepickerModule,
    MatIconModule,
    ReactiveFormsModule,
    CommonModule,
    MatDialogModule,
    MatCheckbox,
  ],
})
export class HomePage implements OnInit {
  signInForm!: FormGroup;
  timer!: number;
  resendButtonDisabled: any = true;
  interval: any;

  signIn: boolean = true;
  otp: boolean = false;
  count: number = 0;
  submitButtonDisabled: any = true;
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private dialog: MatDialog,
    private data: DataService,
    private commonService:CommonServiceService
  ) {}

  ngOnInit(): void {
    this.signInForm = this.fb.group({
      mobileNumber: [
        '',
        [Validators.required, Validators.pattern('^[0-9]{10}$')],
      ],
      agree: [false, Validators.requiredTrue],
      digit1: ['', [Validators.required, Validators.maxLength(1)]],
      digit2: ['', [Validators.required, Validators.maxLength(1)]],
      digit3: ['', [Validators.required, Validators.maxLength(1)]],
      digit4: ['', [Validators.required, Validators.maxLength(1)]],
    });
    this.updateFieldState();
  }

  updateFieldState() {
    if (this.otp) {
      this.signInForm.get('digit1')?.enable();
      this.signInForm.get('digit2')?.enable();
      this.signInForm.get('digit3')?.enable();
      this.signInForm.get('digit4')?.enable();
    } else {
      this.signInForm.get('digit1')?.disable();
      this.signInForm.get('digit2')?.disable();
      this.signInForm.get('digit3')?.disable();
      this.signInForm.get('digit4')?.disable();
    }
  }

  openSignUpPage() {
    this.router.navigate(['/sign-up']);
  }
  openSignInPage() {
    this.signIn = true;
    this.otp = false;
  }

  onSignIn(mobileNumber: string | null) {
    // const formData = JSON.parse(localStorage.getItem('signUpFormData') || '{}');
    // const storedMoNum = formData.phoneNumber;
    // if (mobileNumber === storedMoNum) {
    // //  this.successDialogPage.failed=true;
    // this.data.success=true;
    // this.data.failed=false;
    //  this.showLoadingDialog();
    // }
    // else{
    //   this.data.success=false;
    // this.data.failed=true;
    // this.showLoadingDialog();
    // }
    const requestData = {
      alias: 'LOCALHOST5400',
      phone: mobileNumber,
    };
    this.data.postData(requestData).subscribe((res) => {
      console.log(res);
      this.data.mobileNum = mobileNumber;
      // if(requestData.phone===mobileNumber) {
      // console.log(res);
      this.data.postVar = res;
      this.showLoadingDialog();
      // }
      // else{
      //   res.messagestatus=false;
      //   res.message="Invalid request";
      //   res.messageType="BAD_REQUEST";
      //   this.data.postVar=res;
      //   this.showLoadingDialog();
      // }
    });
  }

  //open otp page
  openOtp() {
    this.signIn = false;
    this.otp = true;
    this.startTimer();
  }

  //start timer for otp
  startTimer() {
    this.timer = 60;
    this.resendButtonDisabled = true;
    this.interval = setInterval(() => {
      if (this.timer > 0) {
        this.timer--;
      } else {
        clearInterval(this.interval);
        this.resendButtonDisabled = false;
      }
    }, 1000);
  }

  //open close dialogs
  showLoadingDialog() {
    const dialogRef1 = this.dialog.open(LoadingDialogPage, {
      width: '850px',
      height: 'auto',
      maxWidth: '90vw',
      maxHeight: '90vh',
      disableClose: true, //use to avoid user to close dialog by clicking outside
    });

    setTimeout(() => {
      dialogRef1.close();
      this.showSuccessDialog();
    }, 1000);
  }

  showSuccessDialog() {
    const dialogRef2 = this.dialog.open(SuccessDialogPage, {
      width: '850px',
      height: 'auto',
      maxWidth: '90vw',
      maxHeight: '90vh',
    });
    setTimeout(() => {
      dialogRef2.close();
      if (this.data.postVar.messagestatus) {
        this.openOtp();
      }
    }, 2000);
  }

  onInput(event: any, nextElement: HTMLInputElement) {
    if (event.target.value.length === 1) {
      nextElement.focus();
      //count for submit button enable
      this.count++;
    }
    if (this.count === 4) this.submitButtonDisabled = false;
  }
  onKeyDown(
    event: KeyboardEvent,
    prevElement: HTMLInputElement | null,
    nextElement: HTMLInputElement | null = null
  ) {
    if (event.key === 'Backspace') {
      if (prevElement) {
        prevElement.focus();
        this.count--;
        if (this.count < 4) {
          this.submitButtonDisabled = true;
        }
      }
    } else if (nextElement && event.key === 'ArrowRight') {
      nextElement.focus();
    }
  }
  @ViewChild('digit1') digit1!: ElementRef<HTMLInputElement>;
  @ViewChild('digit2') digit2!: ElementRef<HTMLInputElement>;
  @ViewChild('digit3') digit3!: ElementRef<HTMLInputElement>;
  @ViewChild('digit4') digit4!: ElementRef<HTMLInputElement>;

  openSignInSuccessPage() {
    const otp = [
      this.digit1.nativeElement.value,
      this.digit2.nativeElement.value,
      this.digit3.nativeElement.value,
      this.digit4.nativeElement.value,
    ].join('');
    const mobile = this.signInForm.get('mobileNumber')?.value;
    console.log('OTP:', otp);
    console.log('mobile:', mobile);
    const requestData = {
      phone: mobile,
      otp: otp,
      accountType: 'mobile',
      token:
        'dMKvTQMKRJiwPOmCCAv_C0:APA91bG7p8IcgGYcQoXLVwyrlieqBMQVVU1oEbZfAbQwKoQz5zNiLPcwswzSicENYjx1Yx2Z4KgIVQ4zbaiIvbVrrwGicaQCRA0s2uTrBxNy5hFbFKiqVInqrMd_N2wkwNFy9nqoD8AP',
      alias: 'LOCALHOST5400',
    };
    this.data.postDataOtp(requestData).subscribe((response) => {
      console.log('Full response', response);
      console.log("champ",response.body.accountType)
      this.commonService.userType=response.body.accountType;
      console.log("type",this.commonService.userType)
      const token = response.headers.get('Authorization');
      console.log('token', token);
      const sepBearer = token.split(' ');
      const sepToken = sepBearer[1];
      if (token) {
        const loginData = {
          token: sepToken,
        };
        // const loginDataString = JSON.stringify(loginData);
        localStorage.setItem('loginData', sepToken);
        this.router.navigate(['/sign-in-success']);
      } else {
        console.log('Token not found in headers');
      }
    });

    //  this.data.postDataOtp(requestData).subscribe(res=>{
    //   console.log("responseres",res);
    //   if(res.messagestatus===undefined){
    //   const loginData={
    //     token:res.token,
    //     // accountType:res.accountType
    //   }
    //   const loginDataString = JSON.stringify(loginData);
    //   localStorage.setItem('loginData', res.token);
    //   this.router.navigate(['/sign-in-success']);
    // }
    // else{

    // }
    //  });

    // const otpValues =
    //   this.signInForm.get('digit1')?.value+''+this.signInForm.get('digit2')?.value+''+this.signInForm.get('digit3')?.value+''+this.signInForm.get('digit4')?.value+'';
    // console.log("otpdada",otpValues)
    // const predefinedOtp = '1234';
    // if (otpValues === predefinedOtp){
    //   this.router.navigate(['/sign-in-success']);
    // }
    // else{
    //   console.log("erroehdhd")
    // }

    // this.router.navigate(['/sign-in-success']);
    //   const requestData ={
    //     "phone":"8510941831",
    //     "otp":"5678",
    //     "accountType":"mobile",
    //     "token":"dMKvTQMKRJiwPOmCCAv_C0:APA91bG7p8IcgGYcQoXLVwyrlieqBMQVVU1oEbZfAbQwKoQz5zNiLPcwswzSicENYjx1Yx2Z4KgIVQ4zbaiIvbVrrwGicaQCRA0s2uTrBxNy5hFbFKiqVInqrMd_N2wkwNFy9nqoD8AP",
    //     "alias":"LOCALHOST5400"
    //  };
    //   this.data.postDataOtp(requestData).subscribe(res=>{
    //     if(true) {
    //       // console.log(res);

    //     }
    //     else{

    //     }
    //   });
    // this.router.navigate(['/sign-in-success']);
  }
}
/*this.route.queryParams.subscribe(
      params => {
        this.day = params['day'];
        this.days = params['days'];
      }
    )
     this.router.navigate(['/horoscope'],{queryParams:{day:day,days:days} */
