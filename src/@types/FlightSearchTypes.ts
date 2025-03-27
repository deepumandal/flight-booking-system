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

export interface FlightClassCategoryInterface {
  id: string;
  flightClass: "Economy" | "Business" | "First";
  price: number;
  seats: number;
  remainingSeats: number;
  flightId: string;
}

export interface FlightInterface {
  id: string;
  airLineName: string;
  flightNumber: number;
  departureTime: string; // ISO Date string
  estimatedTimeToReach: string; // ISO Date string
  totalSeats: number;
  destination: string;
  origin: string;
  status: "On Time" | "Delayed" | "Cancelled"; // add more if needed
  createdAt: string;
  updatedAt: string;
  flightClassCategories: FlightClassCategoryInterface[];
}
