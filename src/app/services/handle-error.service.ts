import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NotificationService } from './notification.service';

@Injectable({
  providedIn: 'root'
})
export class HandleErrorService {

  constructor(private notificationService: NotificationService) { }

   handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      this.notificationService.showNotification('An error occurred. Please try again later.');
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      
      this.notificationService.showNotification(error.error.detail.message);
    }
    
  }
}
