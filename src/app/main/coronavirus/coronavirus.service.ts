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
        return this.http.get<any>(this.url, {observe: 'response'}).toPromise();
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

}