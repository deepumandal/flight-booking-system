"use client";

import { format } from "date-fns";
import { Plane } from "lucide-react";
import { useState, useMemo } from "react";
import { Button } from "@Components/ui";

const mockBookings = [
  {
    id: "1",
    flightNumber: "BA178",
    from: "New York (JFK)",
    to: "London (LHR)",
    departureDate: new Date("2024-04-15T08:30:00"),
    arrivalDate: new Date("2024-04-15T20:45:00"),
    status: "Confirmed",
  },
  {
    id: "2",
    flightNumber: "BA179",
    from: "London (LHR)",
    to: "New York (JFK)",
    departureDate: new Date("2024-04-22T10:30:00"),
    arrivalDate: new Date("2024-04-22T13:45:00"),
    status: "Pending",
  },
  {
    id: "3",
    flightNumber: "BA180",
    from: "London (LHR)",
    to: "Paris (CDG)",
    departureDate: new Date("2024-03-15T10:30:00"),
    arrivalDate: new Date("2024-03-15T13:45:00"),
    status: "Completed",
  },
];

type FilterType = "all" | "upcoming" | "past";

export const BookingsList = () => {
  const [filter, setFilter] = useState<FilterType>("all");

  const filteredBookings = useMemo(() => {
    const now = new Date();
    switch (filter) {
      case "upcoming":
        return mockBookings.filter((booking) => booking.departureDate > now);
      case "past":
        return mockBookings.filter((booking) => booking.departureDate <= now);
      default:
        return mockBookings;
    }
  }, [filter]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">My Bookings</h2>
          <p className="text-sm text-gray-500">
            View and manage your flight bookings
          </p>
        </div>
        <div className="flex space-x-2">
          <Button
            variant={filter === "all" ? "default" : "outline"}
            onClick={() => setFilter("all")}
            size="sm"
          >
            All Flights
          </Button>
          <Button
            variant={filter === "upcoming" ? "default" : "outline"}
            onClick={() => setFilter("upcoming")}
            size="sm"
          >
            Upcoming
          </Button>
          <Button
            variant={filter === "past" ? "default" : "outline"}
            onClick={() => setFilter("past")}
            size="sm"
          >
            Past
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        {filteredBookings.length === 0 ? (
          <div className="rounded-lg border border-dashed p-8 text-center">
            <p className="text-gray-500">No {filter} flights found</p>
          </div>
        ) : (
          filteredBookings.map((booking) => (
            <div
              key={booking.id}
              className="rounded-lg border bg-card p-6 shadow-sm transition-shadow hover:shadow-md"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="rounded-full bg-primary/10 p-2">
                    <Plane className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold">
                      Flight {booking.flightNumber}
                    </p>
                    <p className="text-sm text-gray-500">{booking.status}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium">
                    {format(booking.departureDate, "PPP")}
                  </p>
                  <p className="text-sm text-gray-500">
                    {format(booking.departureDate, "p")}
                  </p>
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-4">
                    <div>
                      <p className="font-medium">{booking.from}</p>
                      <p className="text-sm text-gray-500">
                        {format(booking.departureDate, "p")}
                      </p>
                    </div>
                    <Plane className="h-4 w-4 rotate-90 text-gray-400" />
                    <div>
                      <p className="font-medium">{booking.to}</p>
                      <p className="text-sm text-gray-500">
                        {format(booking.arrivalDate, "p")}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
