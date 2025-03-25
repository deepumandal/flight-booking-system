import { format } from "date-fns";
import { Plane, Users } from "lucide-react";
import React from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { Button, Model } from "@Components/ui";

interface PassengerDetails {
  type: "adult" | "child" | "infant";
  firstName: string;
  lastName: string;
  age: number;
}

interface FlightBookingForm {
  passengers: PassengerDetails[];
}

const mockFlightDetails = {
  from: "New York (JFK)",
  to: "London (LHR)",
  departureDate: new Date("2024-04-15T08:30:00"),
  arrivalDate: new Date("2024-04-15T20:45:00"),
  flightNumber: "BA178",
  airline: "British Airways",
};

export const FlightBookingModal = () => {
  const { register, control, handleSubmit } = useForm<FlightBookingForm>({
    defaultValues: {
      passengers: [{ type: "adult", firstName: "", lastName: "", age: 0 }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "passengers",
  });

  const onSubmit = (data: FlightBookingForm) => {
    console.log("Booking submitted:", data);
    // Handle booking submission
  };

  return (
    <Model>
      <Model.Trigger asChild>
        <Button className="gap-2">
          <Plane className="h-4 w-4" />
          Book Flight
        </Button>
      </Model.Trigger>
      <Model.Content className="max-w-2xl bg-white">
        <Model.Header>
          <Model.Title>Flight Booking</Model.Title>
          <Model.Description>
            Please review flight details and enter passenger information
          </Model.Description>
        </Model.Header>

        <div className="grid gap-6">
          {/* Flight Details Section */}
          <div className="rounded-lg bg-gray-50 p-4">
            <h3 className="mb-4 font-semibold">Flight Details</h3>
            <div className="grid gap-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">
                    {mockFlightDetails.from}
                  </p>
                  <p className="text-xs text-gray-500">
                    {format(mockFlightDetails.departureDate, "PPP p")}
                  </p>
                </div>
                <Plane className="h-4 w-4 rotate-90 text-gray-400" />
                <div className="text-right">
                  <p className="text-sm font-medium">{mockFlightDetails.to}</p>
                  <p className="text-xs text-gray-500">
                    {format(mockFlightDetails.arrivalDate, "PPP p")}
                  </p>
                </div>
              </div>
              <div className="flex justify-between text-sm">
                <p>Flight: {mockFlightDetails.flightNumber}</p>
                <p>Airline: {mockFlightDetails.airline}</p>
              </div>
            </div>
          </div>

          {/* Passenger Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">Passenger Details</h3>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() =>
                  append({ type: "adult", firstName: "", lastName: "", age: 0 })
                }
                className="gap-2"
              >
                <Users className="h-4 w-4" />
                Add Passenger
              </Button>
            </div>

            {fields.map((field, index) => (
              <div key={field.id} className="grid gap-4 rounded-lg border p-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-medium">Passenger {index + 1}</h4>
                  {index > 0 && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => remove(index)}
                      className="h-8 px-2 text-red-500 hover:text-red-600"
                    >
                      Remove
                    </Button>
                  )}
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="grid gap-2">
                    <label htmlFor={`passengers.${index}.type`}>Type</label>
                    <select
                      {...register(`passengers.${index}.type`)}
                      className="rounded-md border p-2"
                    >
                      <option value="adult">Adult</option>
                      <option value="child">Child</option>
                      <option value="infant">Infant</option>
                    </select>
                  </div>

                  <div className="grid gap-2">
                    <label htmlFor={`passengers.${index}.firstName`}>
                      First Name
                    </label>
                    <input
                      {...register(`passengers.${index}.firstName`)}
                      className="rounded-md border p-2"
                      placeholder="Enter first name"
                    />
                  </div>

                  <div className="grid gap-2">
                    <label htmlFor={`passengers.${index}.lastName`}>
                      Last Name
                    </label>
                    <input
                      {...register(`passengers.${index}.lastName`)}
                      className="rounded-md border p-2"
                      placeholder="Enter last name"
                    />
                  </div>

                  <div className="grid gap-2">
                    <label htmlFor={`passengers.${index}.age`}>Age</label>
                    <input
                      type="number"
                      {...register(`passengers.${index}.age`)}
                      className="rounded-md border p-2"
                      placeholder="Enter age"
                    />
                  </div>
                </div>
              </div>
            ))}

            <div className="flex justify-end space-x-2 pt-4">
              <Model.Trigger asChild>
                <Button variant="outline">Cancel</Button>
              </Model.Trigger>
              <Button type="submit">Confirm Booking</Button>
            </div>
          </form>
        </div>
      </Model.Content>
    </Model>
  );
};
