import { CUSTOM_ELEMENTS_SCHEMA, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { NgxMatTimepickerModule } from 'ngx-mat-timepicker';
import { MatIconModule } from '@angular/material/icon';
import { MatError, MatFormFieldModule } from '@angular/material/form-field';
import {MatCheckboxModule} from '@angular/material/checkbox'; 

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule,
    MatFormFieldModule,MatSelectModule,MatInputModule,
    MatDatepickerModule,MatNativeDateModule,NgxMatTimepickerModule,MatIconModule,
  ReactiveFormsModule,MatError ,FormsModule,MatCheckboxModule]
})
export class SignUpPage implements OnInit {
  signUpForm!: FormGroup;
 astrologer:boolean=false;
 user:boolean=true;

  constructor(private fb: FormBuilder) {}
  ngOnInit() {
    this.signUpForm = this.fb.group({
      accountType: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      birthDate: ['', Validators.required],
      gender: ['', Validators.required],
      time: ['', Validators.required],
      phoneNumber: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      email: ['', [Validators.required,Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$')]],
      language: ['',Validators.required],
      experience: ['',[Validators.required,Validators.pattern('^[0-9]$')]],
      specialization: ['',Validators.required],
      agree: [false, Validators.requiredTrue]
    });
    this.updateFieldState();
  }

  //use to proper validation work bcz for diff users diff input fields
  updateFieldState() {
    if (this.astrologer) {
      this.signUpForm.get('language')?.enable();
      this.signUpForm.get('experience')?.enable();
      this.signUpForm.get('specialization')?.enable();
      this.signUpForm.get('time')?.disable();
    } else {
      this.signUpForm.get('language')?.disable();
      this.signUpForm.get('experience')?.disable();
      this.signUpForm.get('specialization')?.disable();
      this.signUpForm.get('time')?.enable();
    }
  }

  conditionAstro(){
    this.astrologer=true;
    this.user=false;
    this.updateFieldState();
  }
  conditionUser(){
    this.astrologer=false;
    this.user=true;
    this.updateFieldState();
  }

  onSubmit() {
    localStorage.removeItem("signUpFormData"); 
      //save data to local storage
      localStorage.setItem('signUpFormData',JSON.stringify(this.signUpForm.value));
    }
  }


