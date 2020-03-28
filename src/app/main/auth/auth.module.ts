import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
    MatButtonModule, MatCheckboxModule, MatFormFieldModule,
    MatIconModule, MatInputModule, MatSelectModule
} from '@angular/material';

import { FuseSharedModule } from '@fuse/shared.module';

import { LoginComponent } from "./login/login.component";
import { AuthGuard } from './auth.guard';
// import { CoronavirusModule } from '../coronavirus/coronavirus.module';
// import { CoronavirusComponent } from '../coronavirus/coronavirus.component';


const routes = [
    {
        path: 'login',
        component: LoginComponent
    }
    // {
    //     path: '**',
    //     component: CoronavirusComponent
    // }
];

@NgModule({
    declarations: [
        LoginComponent
    ],
    imports: [
        RouterModule.forChild(routes),

        MatButtonModule,
        MatCheckboxModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatSelectModule,

        FuseSharedModule

        // CoronavirusModule
    ],
    exports: [
        LoginComponent
    ]
})
export class AuthModule {
}
