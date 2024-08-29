import { CUSTOM_ELEMENTS_SCHEMA, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { addIcons } from 'ionicons';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  NavController,
} from '@ionic/angular/standalone';
import {
  arrowBackOutline,
  callSharp,
  chatbubbleEllipsesSharp,
  starSharp,
  videocamSharp,
} from 'ionicons/icons';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
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
export class ProfilePage implements OnInit {
  constructor(public data: DataService, private navCtrl: NavController) {
    addIcons({
      starSharp,
      chatbubbleEllipsesSharp,
      videocamSharp,
      callSharp,
    });
  }

  ngOnInit() {}

  goBack() {
    this.navCtrl.back();
  }
}
