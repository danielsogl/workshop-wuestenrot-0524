import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  NgZone,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
  inject,
  input,
  model,
  output,
} from '@angular/core';
import { Flight } from '../model/flight';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-flight-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './flight-card.component.html',
  styleUrl: './flight-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FlightCardComponent implements OnInit, OnChanges, OnDestroy {
  // @Input({
  //   required: true,
  //   alias: 'item',
  // })
  // flight!: Flight;
  // @Input({ required: true }) selected = false;

  flight = input.required<Flight>({ alias: 'item' });
  selected = model.required<boolean>();

  private element = inject(ElementRef);
  private zone = inject(NgZone);
  // selected = input.required<boolean>();

  // selectedChange = output<boolean>();

  // @Output() selectedChange = new EventEmitter<boolean>();

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
    this.selected.set(!this.selected);
  }

  blink() {
    // Dirty Hack used to visualize the change detector
    this.element.nativeElement.firstChild.style.backgroundColor = 'crimson';

    this.zone.runOutsideAngular(() => {
      setTimeout(() => {
        this.element.nativeElement.firstChild.style.backgroundColor = 'white';
      }, 1000);
    });

    return null;
  }
}
