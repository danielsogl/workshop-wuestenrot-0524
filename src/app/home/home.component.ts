import { AsyncPipe } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Component, DestroyRef, OnDestroy, inject } from '@angular/core';
import {
  AsyncSubject,
  BehaviorSubject,
  ReplaySubject,
  Subject,
  Subscription,
  interval,
  of,
  takeUntil,
} from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnDestroy {
  private subject = new Subject<number>();
  public readonly subject$ = this.subject.asObservable();

  private behaviorSubject = new BehaviorSubject<number>(0);
  public readonly behaviorSubject$ = this.behaviorSubject.asObservable();

  private replaySubject = new ReplaySubject<number>(3);
  public readonly replaySubject$ = this.replaySubject.asObservable();

  private asyncSubject = new AsyncSubject<number>();
  public readonly asyncSubject$ = this.asyncSubject.asObservable();

  public readonly ofObservable$ = of(1, 2, 3, 4, 5);

  public readonly intervalObservable$ = interval(1000);

  private onDestroySubject = new Subject<void>();
  private subscriptions = new Subscription();
  private subsAsArray: Subscription[] = [];

  private destroyRef = inject(DestroyRef);

  constructor() {
    this.subsAsArray.push(this.intervalObservable$.pipe(
      takeUntilDestroyed(this.destroyRef),
    ).subscribe((value) =>
      console.log('Interval:', value)
    ));

    //   // setInterval(() => {
    //   //   this.subject.next(1);
    //   // }, 1000);
    //   this.subject$.subscribe((value) => console.log('Subject:', value));
    //   this.subject.next(2);
    //   // setInterval(() => {
    //   //   this.behaviorSubject.next(this.behaviorSubject.value + 1);
    //   // }, 1000);
    //   this.behaviorSubject.subscribe((value) =>
    //     console.log('BehaviorSubject:', value)
    //   );
    //   this.behaviorSubject.next(3);
    //   this.replaySubject.next(1);
    //   this.replaySubject.next(2);
    //   this.replaySubject.next(3);
    //   this.replaySubject.next(4);
    //   this.replaySubject.next(5);
    //   this.replaySubject.next(6);
    //   this.replaySubject$.subscribe((value) =>
    //     console.log('ReplaySubject:', value)
    //   );
    //   this.asyncSubject$.subscribe((value) =>
    //     console.log('AsyncSubject:', value)
    //   );
    //   let counter = 0;
    //   setInterval(() => {
    //     this.asyncSubject.next(counter);
    //     counter++;
    //     if (counter === 5) {
    //       this.asyncSubject.complete();
    //     }
    //   }, 1000);
  }

  ngOnDestroy(): void {
    console.log('HomeComponent destroyed');
    // this.onDestroySubject.next();
    // this.subscriptions.unsubscribe();
    // this.subsAsArray.forEach(sub => sub.unsubscribe());
  }
}
