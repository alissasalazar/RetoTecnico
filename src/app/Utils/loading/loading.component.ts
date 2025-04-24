import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingService } from '../../core/services/loading.service';
 
@Component({
  selector: 'app-loading',
  template: `
    <div class="loading-overlay" *ngIf="isLoading$ | async">
      <div class="spinner"></div>
    </div>
  `,
  styleUrls: ['loading.component.scss'],
  standalone: true,
  imports: [CommonModule],
})
export class LoadingComponent {
 
  constructor(private loadingService: LoadingService) {  }

  get isLoading$() {
    return this.loadingService.loading$;
  }

}
