"use client";

import { useState } from "react";
import { FlightFilterForm } from "@Components/shared/FlightsPage/FilterForm";
import { FlightBookingModal } from "@Components/shared/FlightsPage/FlightBookintModal";
import { FlightCard } from "@Components/shared/FlightsPage/FlightCard";
import { mockFlights } from "@Utils/Mock/flights";

const FlightsPage = () => {
  const [searchParams, setSearchParams] = useState({
    origin: "",
    destination: "",
    departureDate: "",
    returnDate: "",
    passengers: 1,
    cabin: "Economy",
    type: "oneway",
  });

  const filteredFlights = mockFlights.filter(
    (flight) =>
      flight.from.toLowerCase().includes(searchParams.origin.toLowerCase()) &&
      flight.to
        .toLowerCase()
        .includes(searchParams.destination.toLowerCase()) &&
      flight.cabin === searchParams.cabin
  );

  return (
    <div className="min-h-screen bg-blue-50 py-10 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-blue-700 mb-6">
          Search Flights
        </h1>
        <FlightBookingModal />

        <FlightFilterForm
          searchParams={searchParams}
          setSearchParams={setSearchParams}
        />

        <div className="space-y-6">
          {filteredFlights.map((flight) => (
            <FlightCard
              key={flight.id}
              flight={flight}
              isRound={searchParams.type === "round"}
            />
          ))}

          {filteredFlights.length === 0 && (
            <p className="text-center text-gray-600">
              No flights found for your search.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default FlightsPage;
