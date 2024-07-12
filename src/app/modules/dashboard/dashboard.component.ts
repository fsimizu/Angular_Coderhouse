import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  showFiller = false;

  onToggle(value: object): void {
    console.log("toggle!" + JSON.stringify(value) );
    
    }
  }


