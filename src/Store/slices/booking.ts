import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface BookingStateInterface {}

const initialState: BookingStateInterface = {};

const bookingSlice = createSlice({
  name: "booking",
  initialState,
  reducers: {
    setFlightBooking: (state, action: PayloadAction<any>) => {
      console.log("✈️ Booking Details:", action.payload);
    },
  },
});

export const { setFlightBooking } = bookingSlice.actions;
export const bookingsReducer = bookingSlice.reducer;
