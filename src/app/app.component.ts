import { Component } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { register } from 'swiper/element/bundle';
//import { SuccessDialogPage } from '../success-dialog/success-dialog.page';
register();

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  standalone: true,
  imports: [IonApp, IonRouterOutlet,MatDialogModule],
})
export class AppComponent {
  constructor() {}
}
