import { NgModule, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatButtonModule, MatIconModule } from '@angular/material';
import { TranslateModule } from '@ngx-translate/core';
import 'hammerjs';

import { FuseModule } from '@fuse/fuse.module';
import { FuseSharedModule } from '@fuse/shared.module';
import { FuseProgressBarModule, FuseSidebarModule, FuseThemeOptionsModule } from '@fuse/components';

import { fuseConfig } from 'app/fuse-config';

import { AppComponent } from 'app/app.component';
import { LayoutModule } from 'app/layout/layout.module';
import { SampleModule } from 'app/main/sample/sample.module';

import { environment } from '../environments/environment';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthInterceptorService } from './main/auth/auth-interceptor.service';

import { PapaParseModule, PapaParseGlobalConfig } from 'ngx-papaparse';

const appRoutes: Routes = [
    {
        path: 'auth',
        loadChildren: './main/auth/auth.module#AuthModule'
    },
    {
        path: 'coronavirus',
        loadChildren: './main/coronavirus/coronavirus.module#CoronavirusModule'
    },
    {
        path: '**',
        // redirectTo: 'sample'
        // redirectTo: 'auth'
        // redirectTo: 'coronavirus'
        redirectTo: 'coronavirus/dashboard'
    }

];

@NgModule({
    declarations: [
        AppComponent

    ],
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        HttpClientModule,
        RouterModule.forRoot(appRoutes),

        TranslateModule.forRoot(),

        // Material moment date module
        MatMomentDateModule,

        // Material
        MatButtonModule,
        MatIconModule,

        // Fuse modules
        FuseModule.forRoot(fuseConfig),
        FuseProgressBarModule,
        FuseSharedModule,
        FuseSidebarModule,
        FuseThemeOptionsModule,

        // App modules
        LayoutModule,
        SampleModule,



        PapaParseModule
    ],
    providers: [{
        provide: HTTP_INTERCEPTORS,
        useClass: AuthInterceptorService, multi: true,
    },
    // { provide: LOCALE_ID, useValue: 'es' },
    {
        provide: 'PapaParseGlobalConfig',
        useValue: <PapaParseGlobalConfig>{
            scriptPath: '/assets/papaparse.min.js'
        }
    }
    ],
    bootstrap: [
        AppComponent
    ]
})
export class AppModule {
}
