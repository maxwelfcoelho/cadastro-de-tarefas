import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { UserService } from "src/app/user.service";

@Injectable({
    providedIn: "root"
})
export class HttpInterceptorDefault implements HttpInterceptor {

    constructor(
        private readonly userService: UserService
    ) {}

    intercept(
        req: HttpRequest<any>, 
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        req = req.clone({
            setHeaders: {
                'token': this.userService.getToken()
            }
        })

        return next.handle(req);
    }

}