"use client";

import { FlightInterface } from "@AppTypes/FlightSearchTypes";
import { Tabs } from "@Components/ui";
import { selectFlight } from "@Store/slices/flightSlice";
import { useAppDispatch, useAppSelector } from "@Store/store";
import { FlightCard } from "./FlightCard";

export const FlightListWithTabs = () => {
  const { returnFlights, flights, selectedFlights } = useAppSelector(
    (state) => state.flight
  );

  const departure = selectedFlights?.departure;
  const returnFlight = selectedFlights?.return;

  const dispatch = useAppDispatch();

  const shouldShowTabs = flights.length > 0 && returnFlights.length > 0;

  const renderFlightCards = (
    data: FlightInterface[],
    isRound: boolean = false
  ) =>
    data?.length ? (
      <div className="flex flex-col gap-4 my-2">
        {data.map((flight) => (
          <FlightCard
            key={flight.id}
            flight={flight}
            isRound={isRound}
            disabled={
              isRound
                ? returnFlight?.id == flight.id
                : departure?.id == flight.id
            }
            onSelectFlight={() => {
              dispatch(
                selectFlight({
                  [isRound ? "return" : "departure"]: flight,
                })
              );
            }}
          />
        ))}
      </div>
    ) : (
      <p className="text-gray-500">No flights available.</p>
    );

  if (!shouldShowTabs) {
    return renderFlightCards(
      flights.length > 0 ? flights : returnFlights,
      false
    );
  }

  return (
    <Tabs defaultValue="flights" className="w-full">
      <Tabs.List className="my-5 space-x-4">
        <Tabs.Trigger value="flights">Departure Flight</Tabs.Trigger>
        <Tabs.Trigger value="returnFlights">Return Flight</Tabs.Trigger>
      </Tabs.List>

      <Tabs.Content value="flights">
        {renderFlightCards(flights, false)}
      </Tabs.Content>
      <Tabs.Content value="returnFlights">
        {renderFlightCards(returnFlights, true)}
      </Tabs.Content>
    </Tabs>
  );
};
