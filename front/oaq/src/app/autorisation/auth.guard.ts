import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import {AutorisationComponent} from "./autorisation.component";
import {AutorisationService} from "./autorisation.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private autorisation: AutorisationService) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    console.log("CanActivate")
    console.log(this.autorisation.autorisation);
    return this.autorisation.autorisation;

  }

}
