import { NgModule, LOCALE_ID } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
    MatButtonModule, MatDividerModule, MatFormFieldModule, MatIconModule, MatMenuModule,
    MatSelectModule, MatTableModule, MatTabsModule, MatDatepickerModule, MatCheckboxModule, MatInputModule
} from '@angular/material';
import { AgmCoreModule } from '@agm/core';
import { ChartsModule } from 'ng2-charts';
import { NgxChartsModule } from '@swimlane/ngx-charts';

import { FuseSidebarModule } from '@fuse/components';
import { FuseSharedModule } from '@fuse/shared.module';
import { FuseWidgetModule } from '@fuse/components/widget/widget.module';



// import { AnalyticsDashboardComponent } from 'app/main/apps/dashboards/analytics/analytics.component';
// import { AnalyticsDashboardService } from 'app/main/apps/dashboards/analytics/analytics.service';
import { CoronavirusComponent } from './coronavirus.component';
import { UpdateStatsComponent } from './updateStats/updateStats.component';

import { registerLocaleData } from '@angular/common';
// import localeEs from '@angular/common/locales/es';
import localeEs from '@angular/common/locales/es-HN';
import { AuthGuard } from '../auth/auth.guard';


registerLocaleData(localeEs);

const routes: Routes = [
    {
        path: 'stat/add',
        canActivate: [AuthGuard],
        component: UpdateStatsComponent
    },
    {
        path: 'dashboard',
        component: CoronavirusComponent
    }
];

@NgModule({
    declarations: [
        UpdateStatsComponent,
        CoronavirusComponent

    ],
    imports: [
        RouterModule.forChild(routes),

        MatButtonModule,
        MatDividerModule,
        MatFormFieldModule,
        MatIconModule,
        MatMenuModule,
        MatSelectModule,
        MatTableModule,
        MatTabsModule,
        MatDatepickerModule,


        MatCheckboxModule,
        MatInputModule,

        NgxChartsModule,
        ChartsModule,

        FuseSharedModule,
        FuseSidebarModule,
        FuseWidgetModule

    ],
    exports: [
        UpdateStatsComponent,
        CoronavirusComponent

    ],
    providers: [
        { provide: LOCALE_ID, useValue: 'es-HN' }
    ],
})
export class CoronavirusModule {
}

