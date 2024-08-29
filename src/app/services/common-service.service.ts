import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommonServiceService {
  userType:any;
  languagesArray:any[]=[];
  langs = [
    { id: 1, name: 'Hindi', selected: false },
    { id: 2, name: 'Marathi', selected: false },
    { id: 3, name: 'English', selected: false },
    { id: 4, name: 'Tamil', selected: false },
    
  ];
  constructor() { }
  loadSelectedLangs() {
    const storedLangs = localStorage.getItem('selectedLangs');
    if (storedLangs) {
      this.languagesArray = JSON.parse(storedLangs);
    }
  }
  deleteLang(cardItem: any) {
    
    this.languagesArray = this.languagesArray.filter(item => item.id !== cardItem.id);
    localStorage.setItem('selectedLangs', JSON.stringify(this.languagesArray));
  }
}
