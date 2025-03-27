import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FlightInterface } from "@AppTypes/FlightSearchTypes";
import { FlightsControllerFindAllParams } from "src/sdk";

export interface flightFiltersInterface extends FlightsControllerFindAllParams {
  airline: string;
}
export interface selectedFlightsInterface {
  departure: FlightInterface | null;
  return?: FlightInterface | null;
}
interface FlightsStateInterface {
  filters: flightFiltersInterface;
  flights: FlightInterface[];
  returnFlights: FlightInterface[];
  selectedFlights: selectedFlightsInterface;
}

const initialState: FlightsStateInterface = {
  filters: {
    airLineName: "",
    destination: "",
    origin: "",
    isRoundTrip: false,
    startDate: "",
    airline: "",
    endDate: "",
  },
  flights: [],
  returnFlights: [],
  selectedFlights: {
    departure: null,
    return: null,
  },
};

const flightsSlice = createSlice({
  name: "flight",
  initialState,
  reducers: {
    setFilters(state, action: PayloadAction<Partial<flightFiltersInterface>>) {
      state.filters = {
        ...state.filters,
        ...action.payload,
      };
    },
    setFetchedFlights(
      state,
      action: PayloadAction<{
        flights: FlightInterface[];
        returnFlights: FlightInterface[];
      }>
    ) {
      state.flights = action.payload.flights;
      state.returnFlights = action.payload.returnFlights;
    },
    selectFlight(
      state,
      action: PayloadAction<Partial<selectedFlightsInterface>>
    ) {
      state.selectedFlights = { ...state.selectedFlights, ...action.payload };
    },
    cleanSelectionFlight: (state) => {
      state.selectedFlights = {
        departure: null,
        return: null,
      };
    },
  },
});

export const {
  setFilters,
  setFetchedFlights,
  selectFlight,
  cleanSelectionFlight,
} = flightsSlice.actions;
export const flightsReducer = flightsSlice.reducer;
