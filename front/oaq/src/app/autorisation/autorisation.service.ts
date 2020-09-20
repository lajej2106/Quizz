import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AutorisationService {

  private autorise: boolean

  constructor() { }

  set autorisation(autorise: boolean){
    this.autorise = autorise
  }

  get autorisation() {
    return this.autorise;
  }

}
