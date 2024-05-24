import {
  patchState,
  signalStore,
  withComputed,
  withMethods,
  withState,
  signalStoreFeature,
} from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { Flight } from '../model/flight';
import { computed, inject } from '@angular/core';
import { FlightService } from '../services/flight.service';
import { firstValueFrom, pipe, switchMap, tap } from 'rxjs';
import {
  withDevtools,
  withStorageSync,
} from '@angular-architects/ngrx-toolkit';
import { withEntities } from '@ngrx/signals/entities';

export type WithMessagesState = {
  message: string | null;
};

export const withMessages = () => {
  return signalStoreFeature(
    withState<WithMessagesState>({
      message: null,
    }),
    withComputed(({ message }) => ({
      hasMessages: computed(() => message !== null),
    })),
    withMethods((store) => {
      const showAlertMessage = (message: string) => {
        patchState(store, { message });
      };

      const showInfoMessage = (message: string) => {
        patchState(store, { message });
      };

      return { showAlertMessage, showInfoMessage };
    })
  );
};

export type FlightSearchState = {
  flights: Flight[];
  selectedFlight: Flight | null;
  loading: boolean;
};

export const FlightSearchStore = signalStore(
  { providedIn: 'root' },
  withDevtools('flights'),
  withStorageSync('flights'),
  withState<FlightSearchState>({
    flights: [],
    selectedFlight: null,
    loading: false,
  }),
  withMessages(),
  withComputed(({ loading }) => ({
    isNotLoading: computed(() => !loading),
  })),
  withMethods((store) => {
    const flightService = inject(FlightService);

    const search = async (from: string, to: string) => {
      patchState(store, { loading: true });
      const flights = await firstValueFrom(flightService.search(from, to));
      patchState(store, { flights, loading: false });
      store.showAlertMessage('Search completed');
    };

    // const search = rxMethod<{ from: string; to: string }>(
    //   pipe(
    //     tap(() => patchState(store, { loading: true })),
    //     switchMap(({ from, to }) => flightService.search(from, to)),
    //     tap((flights) => patchState(store, { flights, loading: false }))
    //   )
    // );
    return { search };
  })
);
