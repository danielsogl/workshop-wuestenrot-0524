import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-flights',
  standalone: true,
  imports: [RouterLink, RouterOutlet],
  templateUrl: './flights.component.html',
  styleUrl: './flights.component.scss',
})
export class FlightsComponent implements OnInit {
  private activatedRoute = inject(ActivatedRoute);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe((data) => {
      console.log(data);
    });
  }
}
