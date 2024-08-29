import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';
import { MatIcon } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-success-dialog',
  templateUrl: './success-dialog.page.html',
  styleUrls: ['./success-dialog.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    MatIcon,
    MatDialogModule,
  ],
})
export class SuccessDialogPage implements OnInit {
  static this: any;
  success!: boolean;
  failed!: boolean;
  constructor(private route: ActivatedRoute, public data: DataService) {}

  ngOnInit() {
    this.success = this.data.success;
    this.failed = this.data.failed;
  }
  // success:boolean=false;
  // failed:boolean=false;
}
