
export class Stats {
    cases: number;
    todayCases: number;
    deaths: number;
    todayDeaths: number;
    recovered: number;
    active: number;
    critical: number;
    date: Date;

    constructor(stat?){
        stat = stat || {};
        this.cases = stat.cases || 0;
        this.todayCases = stat.todayCases || 0;
        this.deaths = stat.deaths || 0;
        this.todayDeaths = stat.todayDeaths || 0;
        this.recovered = stat.recovered || 0;
        this.active = stat.active || 0;
        this.critical = stat.critical || 0;
        this.date = stat.date || Date.now();
    }
}