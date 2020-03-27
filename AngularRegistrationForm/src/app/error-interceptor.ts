import { HttpRequest, HttpHandler, HttpErrorResponse, HttpInterceptor } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { MatDialog } from '@angular/material';
import { Injectable } from '@angular/core';
import { ErrorComponent } from './error/error/error.component';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

    constructor(private dialog: MatDialog) {}
    intercept(req: HttpRequest<any>, next: HttpHandler) {
        return next.handle(req).pipe(
            catchError((error: HttpErrorResponse) => {
                let errorMessage = 'An unknown error occurred, try after some time.';
                if (error.status === 500) {
                    errorMessage = 'Internal Server Error, try after some time.';
                } else if (error.status === 422) {
                    errorMessage = 'Give Proper information';
                } else if (error.status === 400) {
                    // tslint:disable-next-line: max-line-length
                    errorMessage = 'Server could not understand the request due to invalid syntax, Fill all required field properly or try after some time';
                }  else if (error.status === 404) {
                    errorMessage = 'Bad Request, the URL is not recognized, try after some time.';
                }  else if (error.status === 408) {
                    errorMessage = 'Request Timeout, try after some time.';
                }  else if (error.status === 503) {
                    errorMessage = 'Server Unavailable, try after some time.';
                }
                this.dialog.open(ErrorComponent, {data: {message: errorMessage}});
                return throwError(error);
            })
        );
    }
}
