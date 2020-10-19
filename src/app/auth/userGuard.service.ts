import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import {AuthService} from './auth.service';
import {map, take} from 'rxjs/operators';
import { Injectable } from '@angular/core';

@Injectable({providedIn:'root'})
export class UserGuardService implements CanActivate {

    constructor(private router: Router,
                private authService : AuthService) {}
    
    canActivate(route: ActivatedRouteSnapshot,
                router: RouterStateSnapshot) 
        : boolean | UrlTree | Promise<boolean | UrlTree> | Observable<boolean | UrlTree> { 
            return this.authService.user.pipe(
                take(1),
                map(user => {
                    if(!!user) return true;
                    return this.router.createUrlTree(['/upload','start']);
                })
            )
        }
}


