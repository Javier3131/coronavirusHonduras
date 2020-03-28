import { OnInit, ViewEncapsulation, Component } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Stats } from '../stats.model';
import { CoronaVirusService } from '../coronavirus.service';
import Swal from 'sweetalert2';


@Component({
    selector: 'updatestats',
    templateUrl: './updateStats.component.html',
    styleUrls: ['./updateStats.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class UpdateStatsComponent implements OnInit {

    statForm: FormGroup;
    stat: Stats;


    constructor(private _formBuilder: FormBuilder, private coronaService: CoronaVirusService) {
        this.stat = new Stats();
    }

    ngOnInit(): void {


        // this.statForm = this.createStatForm();
    }


    onSaveStat(): void {
        
        this.coronaService.saveStat(this.stat);
        Swal.fire('Agregado Exitosamente', '', 'success');
    }

    onGetData(): void {
        this.coronaService.getData()
            .then(data => {
                // console.log(data);
                this.stat = new Stats(data.body);

                // console.log(this.stat);
                

            })
            .catch(error => {
                console.log(error);
            });
    }
}