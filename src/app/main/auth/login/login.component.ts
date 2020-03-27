import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';

import { FuseConfigService } from '@fuse/services/config.service';
import { fuseAnimations } from '@fuse/animations';
import { AuthService, AuthResponseData } from '../auth.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from '../user.model';
import Swal from 'sweetalert2'
import { SweetAlert } from 'app/services/sweet-alert.service';

@Component({
    selector: 'login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})

export class LoginComponent implements OnInit {
    loginForm: FormGroup;

    isLoginMode: boolean = true;
    isLoading = false;
    error: string = null;


    myLogin: User = new User('', '', '', null);

    /**
     * Constructor
     *
     * @param {FuseConfigService} _fuseConfigService
     * @param {FormBuilder} _formBuilder
     */
    constructor(
        private _fuseConfigService: FuseConfigService,
        private _formBuilder: FormBuilder,
        private authService: AuthService,
        private router: Router,
        private alert: SweetAlert
    ) {
        // Configure the layout
        this._fuseConfigService.config = {
            layout: {
                navbar: {
                    hidden: true
                },
                toolbar: {
                    hidden: true
                },
                footer: {
                    hidden: true
                },
                sidepanel: {
                    hidden: true
                }
            }
        };
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        this.loginForm = this._formBuilder.group({
            username: ['', [Validators.required]],
            password: ['', Validators.required]
        });

    }

    onLogin() {
        const data = this.loginForm.getRawValue();

        const username = data.username;
        const password = data.password;
        let authObs: Observable<AuthResponseData>;

        // Swal.fire({
        //     title: 'Loading...',
        //     timerProgressBar: true,
        //     allowOutsideClick: false,
        //     allowEscapeKey : false,
        //     allowEnterKey : false
        // });
        // Swal.showLoading();
        this.alert.loading();

        authObs = this.authService.login(username, password);

        authObs.subscribe(
            resData => {
                this.alert.closeLoading();
                this.router.navigate(['/coronavirus/dashboard']);
            },
            errorMessage => {
                // Swal.close();
                this.alert.closeLoading();
                Swal.fire(errorMessage, '', 'error');
                // console.log(errorMessage);
                this.error = errorMessage;
                this.isLoading = false;
            }
        );

    }
}