import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { SearchService } from '../services/search.service';

@Injectable({
  providedIn: 'root'
})
export class SearchGuard implements CanActivate {
  constructor(private searchService: SearchService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
    if (this.searchService.hasData())
      return true;
    else
      return false
  }
  
}
