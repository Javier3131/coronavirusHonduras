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
import { DatePipe } from '@angular/common';
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
    hCured: number[] = [];
    hDays: string[] = [];
    datePipe = new DatePipe('es-Hn');
    myAnnotation: any[] = [];

    dateNow = Date.now();
    confirmedCases;
    confirmedDeath;
    todayCases;
    todayDeaths;
    recoveredCases;
    activeCases;
    criticalCases;

    globalconfirmedCases: number;
    globalconfirmedDeath: number;
    globaltodayCases: number;
    globaltodayDeaths: number;
    globalrecoveredCases: number;
    globalactiveCases: number;
    globalcriticalCases: number;

    // chart
    public lineChartData: ChartDataSets[] = [
        // { data: this.hCured, label: 'Recuperados' },
        { data: this.hCases, label: 'Casos', yAxisID: 'y-axis-0' },
        { data: this.hDeath, label: 'Muertes' }
        // { data: this.hCured, label: 'Recuperdos' }
    ];

    public lineChartLabels: any[] = this.hDays;

    public lineChartOptions: (ChartOptions & { annotation: any }) = {
        responsive: true,
        scales: {
            // We use this empty structure as a placeholder for dynamic theming.
            xAxes: [{}],
            yAxes: [
                {
                    id: 'y-axis-0',
                    position: 'left',
                    // ticks: {
                    //     fontColor: 'blue',
                    // }
                }
            ]
        },
        plugins: {
            datalabels: {
                anchor: 'end',
                align: 'end',
            }
        },
        annotation: {
            // annotations: [
            //     {
            //         type: 'line',
            //         mode: 'vertical',
            //         scaleID: 'x-axis-0',
            //         value: 'March',
            //         borderColor: 'orange',
            //         borderWidth: 2,
            //         label: {
            //             enabled: true,
            //             fontColor: 'orange',
            //             content: 'LineAnno'
            //         }
            //     }
            // ],
            annotations: this.myAnnotation
        },
    };

    public lineChartColors: Color[] = [
        { // grey
            

            // backgroundColor: 'rgba(148,159,177,0.2)',
            backgroundColor: 'rgb(3, 169, 244)',
            borderColor: 'rgba(148,159,177,1)',
            pointBackgroundColor: 'rgba(148,159,177,1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(148,159,177,0.8)'
        },
        { // red
            // backgroundColor: 'rgba(255,0,0,0.3)',
            backgroundColor: 'rgb(244, 67, 54)',
            borderColor: 'red',
            pointBackgroundColor: 'rgba(148,159,177,1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(148,159,177,0.8)'
        },
        { // red
            backgroundColor: 'rgba(123, 239, 178, 1)',
            borderColor: 'green',
            pointBackgroundColor: 'rgba(148,159,177,1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(148,159,177,0.8)'
        }
    ];

    public lineChartLegend = true;
    // public lineChartType = 'line';
    public lineChartType = 'bar';

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
        this.getGlobalData();
    }

    toggleSidebar(name): void {
        this._fuseSidebarService.getSidebar(name).toggleOpen();
    }

    getData(): void {
        this.coronaService.getData()
            .then((response: any) => {
                console.log({ data: response });
                this.confirmedCases = response.body.cases;
                this.confirmedDeath = response.body.deaths;
                this.todayCases = response.body.todayCases;
                this.todayDeaths = response.body.todayDeaths;
                this.recoveredCases = response.body.recovered;
                this.activeCases = response.body.active;
                this.criticalCases = response.body.critical;
                this.dateNow = response.body.updated;
                // this.dateNow = response.body.
                // console.log(response.headers.get('date'));
                // this.dateNow = response.headers.get('date');

            })
            .catch(error => {
                console.log({ error: error });
            });
    }

    getGlobalData(): void {
        this.coronaService.getGlobalData()
            .then((response: any) => {
                // console.log({ data: response });
                this.globalconfirmedCases = response.body.cases;
                this.globalconfirmedDeath = response.body.deaths;
                this.globaltodayCases = response.body.todayCases;
                this.globaltodayDeaths = response.body.todayDeaths;
                this.globalrecoveredCases = response.body.recovered;
                this.globalactiveCases = response.body.active;
                this.globalcriticalCases = response.body.critical;

            })
            .catch(error => {
                console.log({ error: error });
            });
    }

    getHistoricalData(): void {
        this.coronaService.getStats()
            .subscribe(statsArray => {
                this.historicalStats = statsArray;
                this.hCases = this.historicalStats.map(x => x.todayCases);
                this.hDeath = this.historicalStats.map(x => x.todayDeaths);
                this.hCured = this.historicalStats.map(x => x.recovered);

                const datesArray = this.historicalStats.map(x => x.date);

                //  tslint:disable-next-line: forin
                for (const i in datesArray) {
                    const d: Date = datesArray[i];
                    const dStr = this.datePipe.transform(d, 'yyyy/MM/dd');
                    this.hDays.push(dStr);
                }

                // console.log({MaxCases: Math.max.apply(Math, this.hCases.map(function(o) { return o; }))});
                const maxCasesValue = Math.max.apply(Math, this.hCases.map(function (o) { return o; }));
                const positionInhCases = this.hCases.indexOf(maxCasesValue);
                const dayOfMaxCases = this.hDays[positionInhCases];
                // console.log({dayOfMaxCases: dayOfMaxCases});

                this.myAnnotation.push(
                    {
                        type: 'line',
                        mode: 'vertical',
                        scaleID: 'x-axis-0',
                        value: dayOfMaxCases,
                        borderColor: 'orange',
                        borderWidth: 2,
                        label: {
                            enabled: true,
                            fontColor: 'orange',
                            content: 'LineAnno'
                        }
                    }
                );

                // console.log({ hCases: this.hCases, hDeath: this.hDeath, datesArray: this.hDays });
                this.lineChartData = [
                    { data: this.hCases, label: 'Casos' },
                    { data: this.hDeath, label: 'Muertes' }
                    // { data: this.hCured, label: 'Recuperdos' }
                ];

                this.chart.chart.update();
            });

    }

    // chars init

    private generateNumber(i: number) {
        return Math.floor((Math.random() * (i < 2 ? 100 : 1000)) + 1);
    }

    // events
    public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
        // console.log(event, active);
    }

    public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
        // console.log(event, active);
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

