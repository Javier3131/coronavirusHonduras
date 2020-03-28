import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { catchError, tap, map, take } from 'rxjs/operators';
import { throwError, Subject, BehaviorSubject } from "rxjs";
import { Stats } from './stats.model';

@Injectable({ providedIn: 'root' })
export class CoronaVirusService {
    url = 'https://corona.lmao.ninja/countries/HONDURAS';
    urlDB = 'https://coronavirushonduras-ff57e.firebaseio.com/';

    constructor(private http: HttpClient
    ) { }

    getData() {
        return this.http.get<any>(this.url, { observe: 'response' }).toPromise();
    }

    saveStat(stat: Stats) {
        const endPoint: string = 'stats.json';
        this.http.post(
            this.urlDB + endPoint,
            stat
        )
            .subscribe(response => {
                console.log(response);
            });
    }

    getStats() {
        const endPoint: string = 'stats.json';
        // this.http.get(this.urlDB + endPoint).subscribe(response => {console.log(response);});
        return this.http.get(this.urlDB + endPoint)
            .pipe(
                map((data: any[]) => {
                    let statsArray: Stats[] = [];
                    for (var i in data) {
                        let active = data[i].active;
                        let cases = data[i].cases;
                        let critical = data[i].critical;
                        let date = new Date(data[i].date);
                        let deaths = data[i].deaths;
                        let recovered = data[i].recovered;
                        let todayCases = data[i].todayCases;
                        let todayDeaths = data[i].todayDeaths;

                        let s = new Stats();
                        s.active = active;
                        s.cases = cases;
                        s.critical = critical;
                        s.date = date;
                        s.deaths = deaths;
                        s.recovered = recovered;
                        s.todayCases = todayCases;
                        s.todayDeaths = todayDeaths;

                        statsArray.push(s);
                    }

                    console.log({ statsArray: statsArray });
                    return statsArray;
                })
            );
            // .subscribe(data => {
            //     console.log(data);
            // });
    }

}