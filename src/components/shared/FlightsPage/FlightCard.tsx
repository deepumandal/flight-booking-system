import Image from "next/image";
import { FlightInterface } from "@AppTypes/FlightSearchTypes";
import { Button } from "@Components/ui";

export const FlightCard = ({
  flight,
  isRound,
  disabled,
  onSelectFlight,
}: {
  flight: FlightInterface;
  isRound: boolean;
  disabled: boolean;
  onSelectFlight: () => void;
}) => {
  const departure = new Date(flight.departureTime);
  const arrival = new Date(flight.estimatedTimeToReach);
  const durationInHours = Math.abs(
    (arrival.getTime() - departure.getTime()) / (1000 * 60 * 60)
  ).toFixed(1);

  const mainClass = flight.flightClassCategories[0]; // pick first class for display
  const formattedDate = departure.toLocaleDateString();
  const formattedTime = departure.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="bg-white rounded-lg shadow-md p-6 flex flex-col md:flex-row gap-4 hover:shadow-lg transition cursor-pointer">
      <Image
        src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80" // use actual airline logo or a default placeholder
        alt="Flight"
        width={160}
        height={120}
        className="rounded-md object-cover"
      />
      <div className="flex-1">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">
            {flight?.origin} → {flight?.destination}
          </h2>
          <span
            className={`text-sm px-3 py-1 rounded-full font-medium ${
              flight.status === "On Time"
                ? "bg-green-100 text-green-700"
                : flight.status === "Delayed"
                  ? "bg-yellow-100 text-yellow-700"
                  : "bg-red-100 text-red-700"
            }`}
          >
            {flight.status}
          </span>
        </div>
        <p className="text-sm text-gray-500 mt-1">{flight?.airLineName}</p>
        <p className="text-sm mt-1">
          <strong>Date:</strong> {formattedDate}
          {isRound && ` → ${arrival.toLocaleDateString()}`}
        </p>
        <p className="text-sm mt-1">
          <strong>Time:</strong> {formattedTime} | <strong>Duration:</strong>{" "}
          {durationInHours}h | <strong>Seats:</strong>{" "}
          {mainClass?.remainingSeats}
        </p>
        <p className="text-base font-semibold text-blue-700 mt-2">
          ₹{mainClass?.price} - {mainClass?.flightClass} Class
        </p>
        {flight.status === "Delayed" && (
          <p className="mt-3 text-sm bg-yellow-50 text-yellow-800 px-4 py-2 rounded">
            ⚠ Estimated delay in arrival.
          </p>
        )}
      </div>
      <Button
        disabled={disabled}
        onClick={onSelectFlight}
        className="bg-blue-600 text-white"
      >
        Select Flight
      </Button>
    </div>
  );
};
