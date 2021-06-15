import {Injectable} from '@angular/core';
import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginService } from './login.service';

@Injectable()
export class AuthIntercepter implements HttpInterceptor
{
    constructor(private loginService: LoginService)
    {

    }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let token = this.loginService.getToken();
        let newRequest = req;
        if(token != null)
        {
            newRequest = req.clone({
                setHeaders: {
                  Authorization: `Bearer ${this.loginService.getToken()}`
                }
              });
        }
        console.log("intercepter");
        console.log(newRequest);
        return next.handle(newRequest)
    }

}