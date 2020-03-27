import { Injectable } from "@angular/core";
import Swal from 'sweetalert2';

@Injectable({ providedIn: 'root' })
export class SweetAlert {

    public loading() {
        Swal.fire({
            title: 'Loading...',
            timerProgressBar: true,
            allowOutsideClick: false,
            allowEscapeKey: false,
            allowEnterKey: false
        });
        Swal.showLoading();
    }

    public closeLoading(){
        Swal.close();
    }
}