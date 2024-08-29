import { CUSTOM_ELEMENTS_SCHEMA, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { arrowBackOutline } from 'ionicons/icons';
import { Router } from '@angular/router';
import { CommonServiceService } from 'src/app/services/common-service.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.page.html',
  styleUrls: ['./edit-profile.page.scss'],
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class EditProfilePage implements OnInit {
  

  constructor(private router:Router,public common:CommonServiceService) {
    addIcons({arrowBackOutline})
   }

  ngOnInit() {
    // this.common.loadSelectedLangs();
  }
 goBack(){
  this.router.navigate(['/astro/my-profile'])
 }
 addSelectedILangs() {
  this.saveSelectedLangs();
  this.common.loadSelectedLangs();
  this.router.navigate(['/astro/my-profile'])
}
onCheckboxChange(event: any, item: any) {
  item.selected = event.detail.checked;
  this.saveSelectedLangs();
}
saveSelectedLangs() {
  const selectedItems = this.common.langs.filter(item => item.selected);
  localStorage.setItem('selectedLangs', JSON.stringify(selectedItems));
}


}
