"use client";

import { format } from "date-fns";
import { Plane } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FlightInterface } from "@AppTypes/FlightSearchTypes";
import { appRoutes } from "@Components/config/routes";
import { useBookingService } from "@Components/hooks/useBooking";
import { Button, Model } from "@Components/ui";
import { Input } from "@Components/ui/input";
import { Toaster } from "@Components/ui/Toaster";
import {
  cleanSelectionFlight,
  selectedFlightsInterface,
} from "@Store/slices/flightSlice";
import { useAppDispatch, useAppSelector } from "@Store/store";
import { bookingControllerVerifyPayment } from "src/sdk";

interface BookingForm extends selectedFlightsInterface {
  passengerCount: number;
  selectedClass: "Economy" | "Business" | "First" | "Premium Economy";
}

export const FlightBookingModal = () => {
  const [open, setOpen] = useState(false);
  const [isBooked, setIsBooed] = useState(false);
  const router = useRouter();
  const dispatch = useAppDispatch();

  const [bookingIds, setBookingIds] = useState<string[]>([]);

  const selectedFlight = useAppSelector(
    (store) => store.flight.selectedFlights
  );
  const { user } = useAppSelector((store) => store.auth);
  const departureFlight = selectedFlight?.departure;
  const returnFlight = selectedFlight?.return;

  const { bookFlight } = useBookingService((id) => {
    setIsBooed(true);
    setBookingIds((p) => [...p, id]);
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BookingForm>({
    defaultValues: {
      passengerCount: 1,
      selectedClass: "Economy",
    },
  });

  const handlePayment = async () => {
    const paymentStatus = Math.random() < 0.9 ? "SUCCESS" : "FAILED";
    console.log("🚀 Payment status:", paymentStatus);

    try {
      const response = await Promise.allSettled(
        bookingIds.map((bookingId) =>
          bookingControllerVerifyPayment({
            paymentStatus,
            bookingId,
          })
        )
      );
      console.log("✅ Payment verification response:", response);
      Toaster({
        type: "success",
        message: "Payment successful",
      });

      dispatch(cleanSelectionFlight());
      setOpen(false);
      router.push(appRoutes.dashboard);
    } catch (error) {
      Toaster({
        type: "error",
        message: "Payment failed",
      });
      console.error("❌ Payment verification failed:", error);
    }
  };
  const onSubmit = (data: BookingForm) => {
    if (user?.id) {
      const { passengerCount, selectedClass } = data;

      const payload = {
        passengers: +passengerCount,
        flightClass: selectedClass,
        userId: user.id,
      };

      console.log("✅ Booking Payload:", data);
      if (departureFlight) {
        // console.log("✅ Booking Payload departure:", payload);
        bookFlight({ ...payload, flightId: departureFlight.id });
      }
      if (returnFlight) {
        // console.log("✅ Booking Payload return:", payload);
        bookFlight({ ...payload, flightId: returnFlight.id });
      }
    } else {
      router.push("/auth");
    }
  };

  const renderFlightSection = (label: string, flight: FlightInterface) => (
    <div className="rounded-lg bg-gray-50 p-4">
      <h3 className="mb-4 font-semibold">{label}</h3>
      <div className="grid gap-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium">{flight.origin}</p>
            <p className="text-xs text-gray-500">
              {format(new Date(flight.departureTime), "PPP p")}
            </p>
          </div>
          <Plane className="h-4 w-4 rotate-90 text-gray-400" />
          <div className="text-right">
            <p className="text-sm font-medium">{flight.destination}</p>
            <p className="text-xs text-gray-500">
              {format(new Date(flight.estimatedTimeToReach), "PPP p")}
            </p>
          </div>
        </div>
        <div className="flex justify-between text-sm">
          <p>Flight: {flight.flightNumber}</p>
          <p>Airline: {flight.airLineName}</p>
        </div>
        <div className="text-sm text-gray-500">
          Status:{" "}
          <span className="font-medium text-green-600">{flight.status}</span>
        </div>
      </div>
    </div>
  );

  return (
    <Model onOpenChange={setOpen} open={open}>
      <Model.Trigger asChild>
        <Button
          disabled={!departureFlight}
          className="gap-2 bg-blue-600 text-white py-6 px-6 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plane className="h-4 w-4" />
          Book and Payment
        </Button>
      </Model.Trigger>

      <Model.Content className="max-w-2xl bg-white">
        <Model.Header>
          <Model.Title>Flight Booking</Model.Title>
          <Model.Description>
            Please review flight details and enter passenger information
          </Model.Description>
        </Model.Header>

        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-6">
          {departureFlight &&
            renderFlightSection("Going Flight", departureFlight)}
          {returnFlight && renderFlightSection("Return Flight", returnFlight)}

          {/* ✏️ Passenger Count */}
          <div className="grid gap-2">
            <label className="text-sm font-medium">Passengers</label>
            <Input
              type="number"
              min={1}
              max={6}
              {...register("passengerCount", {
                required: true,
                min: 1,
                max: 6,
              })}
            />
            {errors.passengerCount && (
              <span className="text-sm text-red-500">
                Must be between 1 and 6 passengers.
              </span>
            )}
          </div>

          {/* ✏️ Class Selector */}
          <div className="grid gap-2">
            <label className="text-sm font-medium">Flight Class</label>
            <select {...register("selectedClass", { required: true })}>
              <option value="Economy">Economy</option>
              <option value="Business">Business</option>
              <option value="First">First</option>
              <option value="Premium Economy">Premium Economy</option>
            </select>
          </div>

          {isBooked && bookingIds.length ? (
            <Button
              onClick={handlePayment}
              type="button"
              className="mt-4 w-full bg-blue-600 text-white"
            >
              Pay now
            </Button>
          ) : (
            <Button
              type="submit"
              className="mt-4 w-full bg-blue-600 text-white"
            >
              Confirm Booking
            </Button>
          )}
        </form>
      </Model.Content>
    </Model>
  );
};
