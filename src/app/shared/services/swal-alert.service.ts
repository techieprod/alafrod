import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class SwalAlertService {

  constructor() { }


  openSwalAlert(heading1, heading2, alertType) {
    Swal.fire(
        heading1,
        heading2,
        alertType
      );
  }
}
