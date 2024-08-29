import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner'; 
import { MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-loading-dialog',
  templateUrl: './loading-dialog.page.html',
  styleUrls: ['./loading-dialog.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, 
    CommonModule, FormsModule, MatProgressSpinnerModule,MatDialogModule]
})
export class LoadingDialogPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
