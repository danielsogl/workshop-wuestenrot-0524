export interface Flight {
  id: number;
  from: string;
  to: string;
  date: string;
  delayed: boolean;
}

export const initialFlight = {
  from: '',
  to: '',
  date: '',
  delayed: false,
  id: 0,
} satisfies Flight;
