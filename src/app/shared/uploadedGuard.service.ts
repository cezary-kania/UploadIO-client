import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import {UploadService} from './upload.service';
import {map, take} from 'rxjs/operators';
import { Injectable } from '@angular/core';

@Injectable({providedIn:'root'})
export class UploadedGuard implements CanActivate {

    constructor(private router: Router,
                private uploadService : UploadService) {}
    
    canActivate(route: ActivatedRouteSnapshot,
                router: RouterStateSnapshot) 
        : boolean | UrlTree | Promise<boolean | UrlTree> | Observable<boolean | UrlTree> { 
            return this.uploadService.createdAnonymousUpload.pipe(
                take(1),
                map(newUpload => {
                    if(!!newUpload) return true;
                    return this.router.createUrlTree(['/upload','start']);
                })
            )
        }
}