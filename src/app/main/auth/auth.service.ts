import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { catchError, tap, map, take } from 'rxjs/operators';
import { throwError, Subject, BehaviorSubject } from "rxjs";
import { User } from './user.model';
import { Router } from '@angular/router';
// import { AngularFirestore } from '@angular/fire/firestore';

export interface AuthResponseData {
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
    kind: string;
    registered?: boolean;
}

@Injectable({ providedIn: 'root' })
export class AuthService {

    user = new BehaviorSubject<User>(null);
    private apiKey = 'AIzaSyDtdDz621THmyMTVFMr82ZKppILzA5_bU8';
    private tokenExpirationTime: any;

    constructor(private http: HttpClient,
        // private firestore: AngularFirestore
        private router: Router
    ) { }

    login(email: string, password: string) {
        return this.http.post<AuthResponseData>(
            'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + this.apiKey,
            {
                email: email,
                password: password,
                returnSecureToken: true
            })
            .pipe(
                catchError(this.handleError),
                tap(response => {
                    this.handleAuthentication(response.email, response.localId, response.idToken, +response.expiresIn);
                })
            );
    }

    logout() {
        this.user.next(null);
        this.router.navigate(['/coronavirus/dashboard']);
        localStorage.removeItem('userData');
        
        if(this.tokenExpirationTime){
            clearTimeout(this.tokenExpirationTime);
        }

        this.tokenExpirationTime = null;
    }

    autoLogout(expirationDuration: number) {
        this.tokenExpirationTime = setTimeout(() => {
            // console.log('en el autologout');
            this.logout();
        }, expirationDuration);
    }

    autoLogin() {
        // console.log('en el autologin');

        const userData: {
            email: string;
            id: string;
            _token: string;
            _tokenExpirationDate: string;
        } = JSON.parse(localStorage.getItem('userData'));

        // console.log(userData);
        if (!userData) {
            return;
        }

        const loadedUser = new User(
            userData.email,
            userData.id,
            userData._token,
            new Date(userData._tokenExpirationDate)
        );

        // console.log({loadedUser: loadedUser});

        if (loadedUser.token) {
            const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
            this.autoLogout(expirationDuration);
            // console.log('Setting loaded user');
            // console.log(loadedUser);
            this.user.next(loadedUser);
        }
    }

    private handleAuthentication(email: string, userId: string, token: string, expiresIn: number) {
        const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
        const user = new User(email, userId, token, expirationDate);
        this.user.next(user);
        this.autoLogout(expiresIn * 1000);
        localStorage.setItem('userData', JSON.stringify(user));
    }

    private handleError(errorRes: HttpErrorResponse) {
        let errorMessage = "An unknown error ocurred!";
        if (!errorRes.error || !errorRes.error.error) {
            return throwError(errorMessage);
        }
        switch (errorRes.error.error.message) {
            case 'EMAIL_EXISTS':
                errorMessage = 'The email address is already in use by another account';
                break;
            case 'EMAIL_NOT_FOUND':
                errorMessage = 'There is no user record corresponding to this identifier. The user may have been deleted.';
                break;
            case 'INVALID_PASSWORD':
                errorMessage = 'The password is invalid or the user does not have a password.';
                break;
            case 'USER_DISABLED':
                errorMessage = 'The user account has been disabled by an administrator.';
                break;
        }

        return throwError(errorMessage);
    }
}