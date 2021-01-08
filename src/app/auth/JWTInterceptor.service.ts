import {HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {exhaustMap, take} from 'rxjs/operators';
import {AuthService} from './auth.service';

@Injectable()
export class JWTInterceptorService implements HttpInterceptor {
    constructor(private authService: AuthService) {}
    intercept(req: HttpRequest<any>, next: HttpHandler) {
        return this.authService.user.pipe(
            take(1),
            exhaustMap(user => {
                if(!user) {return next.handle(req);}
                let token : string = null; 
                if(req.url.endsWith('get_access_token')) token = user.refresh_token;
                else token = user.access_token;
                const newHeaders = req.headers.append('Authorization',`Bearer ${token}`);
                const newRequest = req.clone({headers : newHeaders});
                return next.handle(newRequest);
            })
        )
    }
}