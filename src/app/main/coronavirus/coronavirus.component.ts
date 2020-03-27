import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { DataSource } from '@angular/cdk/collections';
import { BehaviorSubject, Observable } from 'rxjs';
import * as shape from 'd3-shape';
import { fuseAnimations } from '@fuse/animations';
import { FuseSidebarService } from '@fuse/components/sidebar/sidebar.service';
import { FuseConfigService } from '@fuse/services/config.service';
import { CoronaVirusService } from './coronavirus.service';

@Component({
    selector: 'coronavirus',
    templateUrl: './coronavirus.component.html',
    styleUrls: ['./coronavirus.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class CoronavirusComponent implements OnInit {


    dateNow = Date.now();
    confirmedCases;
    confirmedDeath;
    todayCases;
    todayDeaths;
    recoveredCases;
    activeCases;
    criticalCases;

    constructor(
        private _fuseSidebarService: FuseSidebarService,
        private _fuseConfigService: FuseConfigService,
        private coronaService : CoronaVirusService
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

    ngOnInit(): void {
        this.getData();
    }

    toggleSidebar(name): void {
        this._fuseSidebarService.getSidebar(name).toggleOpen();
    }

    getData(): void {
        this.coronaService.getData()
        .then((response: any) => {
            // console.log({data: response});
            this.confirmedCases = response.body.cases;
            this.confirmedDeath = response.body.deaths;
            this.todayCases = response.body.todayCases;
            this.todayDeaths = response.body.todayDeaths;
            this.recoveredCases = response.body.recovered;
            this.activeCases = response.body.active;
            this.criticalCases = response.body.critical;
            // console.log(response.headers.get('date'));
            // this.dateNow = response.headers.get('date');
            
        })
        .catch(error => {
            console.log({error: error});
        });
    }
}

export class FilesDataSource extends DataSource<any>
{
    /**
     * Constructor
     *
     * @param _widget11
     */
    constructor(private _widget11) {
        super();
    }

    /**
     * Connect function called by the table to retrieve one stream containing the data to render.
     *
     * @returns {Observable<any[]>}
     */
    connect(): Observable<any[]> {
        return this._widget11.onContactsChanged;
    }

    /**
     * Disconnect
     */
    disconnect(): void {
    }
}

