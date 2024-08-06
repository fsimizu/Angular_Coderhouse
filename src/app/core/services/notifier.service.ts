import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import Swal, { SweetAlertIcon } from 'sweetalert2';

@Injectable({ providedIn: 'root' })
export class NotifierService {
  private notify$ = new Subject<{text: string, type: SweetAlertIcon | undefined}>();

  constructor() {
    this.notify$.subscribe({
      next: ({text, type}) => {
        Swal.fire(text, '', type);
      },
    });
  }

  sendNotification(text: string, type: SweetAlertIcon | undefined) {
    this.notify$.next({text, type});
  }


}