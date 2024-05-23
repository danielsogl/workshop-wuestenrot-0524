import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { Flight } from '../model/flight';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-flight-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './flight-card.component.html',
  styleUrl: './flight-card.component.scss',
})
export class FlightCardComponent implements OnInit, OnChanges, OnDestroy {
  @Input({
    required: true,
    alias: 'item',
    // transform input values since Angular v14
    // transform: (value: Flight) => {
    //   return { ...value, from: 'Bla' };
    // },
  })
  flight!: Flight;

  @Input({ required: true }) selected = false;

  @Output() selectedChange = new EventEmitter<boolean>();

  constructor() {
    console.log('constructor', this.flight);
  }

  ngOnInit() {
    console.log('onInit', this.flight);
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('onChanges', changes);
  }

  ngOnDestroy(): void {
    console.log('onDestroy');
  }

  toggleSelect() {
    // this.selected = !this.selected;
    this.selectedChange.emit(!this.selected);
  }
}
