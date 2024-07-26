import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent{
  showFiller = false;

  @Output() sidebarDashboardToggle = new EventEmitter<boolean>();

  openMenu = false;

  clickMenu() {
    this.openMenu = !this.openMenu;
    this.sidebarDashboardToggle.emit(this.openMenu);
  }


  }


