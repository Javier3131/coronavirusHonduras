import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { DataSource } from '@angular/cdk/collections';
import { BehaviorSubject, Observable } from 'rxjs';
import * as shape from 'd3-shape';
import { fuseAnimations } from '@fuse/animations';
import { FuseSidebarService } from '@fuse/components/sidebar/sidebar.service';
import { FuseConfigService } from '@fuse/services/config.service';
import { CoronaVirusService } from './coronavirus.service';
import { Color, BaseChartDirective } from 'ng2-charts';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Stats } from './stats.model';
// import * as pluginAnnotations from 'chartjs-plugin-annotation';


@Component({
    selector: 'coronavirus',
    templateUrl: './coronavirus.component.html',
    styleUrls: ['./coronavirus.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class CoronavirusComponent implements OnInit {


    historicalStats: Stats[] = [];
    hCases: number[] = [];
    hDeath: number[] = [];
    hDays: string[] = [];

    dateNow = Date.now();
    confirmedCases;
    confirmedDeath;
    todayCases;
    todayDeaths;
    recoveredCases;
    activeCases;
    criticalCases;

    // chart

    public lineChartData: ChartDataSets[] = [
        { data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A' },
        { data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B' },
        {
            data: [180, 480, 770, 90, 1000, 270, 400], label: 'Series C',
            yAxisID: 'y-axis-1'
        }
    ];
    public lineChartLabels: any[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
    public lineChartOptions: (ChartOptions & { annotation: any }) = {
        responsive: true,
        scales: {
            // We use this empty structure as a placeholder for dynamic theming.
            xAxes: [{}],
            yAxes: [
                {
                    id: 'y-axis-0',
                    position: 'left',
                },
                {
                    id: 'y-axis-1',
                    position: 'right',
                    gridLines: {
                        color: 'rgba(255,0,0,0.3)',
                    },
                    ticks: {
                        fontColor: 'red',
                    }
                }
            ]
        },
        annotation: {
            annotations: [
                {
                    type: 'line',
                    mode: 'vertical',
                    scaleID: 'x-axis-0',
                    value: 'March',
                    borderColor: 'orange',
                    borderWidth: 2,
                    label: {
                        enabled: true,
                        fontColor: 'orange',
                        content: 'LineAnno'
                    }
                },
            ],
        },
    };
    public lineChartColors: Color[] = [
        { // grey
            backgroundColor: 'rgba(148,159,177,0.2)',
            borderColor: 'rgba(148,159,177,1)',
            pointBackgroundColor: 'rgba(148,159,177,1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(148,159,177,0.8)'
        },
        { // dark grey
            backgroundColor: 'rgba(77,83,96,0.2)',
            borderColor: 'rgba(77,83,96,1)',
            pointBackgroundColor: 'rgba(77,83,96,1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(77,83,96,1)'
        },
        { // red
            backgroundColor: 'rgba(255,0,0,0.3)',
            borderColor: 'red',
            pointBackgroundColor: 'rgba(148,159,177,1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(148,159,177,0.8)'
        }
    ];
    public lineChartLegend = true;
    public lineChartType = 'line';
    //   public lineChartPlugins = [pluginAnnotations];

    @ViewChild(BaseChartDirective) chart: BaseChartDirective;



    constructor(
        private _fuseSidebarService: FuseSidebarService,
        private _fuseConfigService: FuseConfigService,
        private coronaService: CoronaVirusService
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
        this.getHistoricalData();
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
                console.log({ error: error });
            });
    }

    getHistoricalData(): void {
        // this.coronaService.getStats()
        //     .then(data => {
        //         console.log(data);
        //     })
        //     .catch(error => {
        //         console.log(error);
        //     });

        this.coronaService.getStats()
            .subscribe(statsArray => {
                this.historicalStats = statsArray;
                this.hCases = this.historicalStats.map(x => x.cases);
                this.hDeath = this.historicalStats.map(x => x.deaths);
                const datesArray = this.historicalStats.map(x => x.date);
                for (var i in datesArray) {
                    const d: Date = datesArray[i];
                    const dStr: string = d.toDateString();
                    this.hDays.push(dStr);
                }

                console.log({ hCases: this.hCases, hDeath: this.hDeath, datesArray: this.hDays });
            });

    }

    // chars init

    // public randomize(): void {
    //     for (let i = 0; i < this.lineChartData.length; i++) {
    //       for (let j = 0; j < this.lineChartData[i].data.length; j++) {
    //         this.lineChartData[i].data[j] = this.generateNumber(i);
    //       }
    //     }
    //     this.chart.update();
    //   }

    private generateNumber(i: number) {
        return Math.floor((Math.random() * (i < 2 ? 100 : 1000)) + 1);
    }

    // events
    public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
        console.log(event, active);
    }

    public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
        console.log(event, active);
    }

    //   public hideOne() {
    //     const isHidden = this.chart.isDatasetHidden(1);
    //     this.chart.hideDataset(1, !isHidden);
    //   }

    public pushOne() {
        this.lineChartData.forEach((x, i) => {
            const num = this.generateNumber(i);
            const data: number[] = x.data as number[];
            data.push(num);
        });
        this.lineChartLabels.push(`Label ${this.lineChartLabels.length}`);
    }

    public changeColor() {
        this.lineChartColors[2].borderColor = 'green';
        this.lineChartColors[2].backgroundColor = `rgba(0, 255, 0, 0.3)`;
    }

    public changeLabel() {
        this.lineChartLabels[2] = ['1st Line', '2nd Line'];
        // this.chart.update();
    }

    // chart end
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

