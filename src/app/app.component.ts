import { Component, inject } from '@angular/core';
import { SidebarComponent } from './sidebar/sidebar.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FlightSearchComponent } from './flight-search/flight-search.component';
import { ConfigService } from './shared/config.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [SidebarComponent, NavbarComponent, FlightSearchComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  configService = inject(ConfigService);

  constructor() {
    this.configService.loadConfig();
  }
}
