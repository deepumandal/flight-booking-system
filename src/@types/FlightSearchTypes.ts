export interface Airport {
  name: string;
  iata_code: string;
  city: string;
  state: string;
}

export interface FlightFormData {
  from: string;
  to: string;
  departDate: string;
  returnDate: string;
  tripType: "oneWay" | "roundTrip";
}
