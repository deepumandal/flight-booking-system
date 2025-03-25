import Image from "next/image";
import Link from "next/link";

export const FlightCard = ({
  flight,
  isRound,
}: {
  flight: any;
  isRound: boolean;
}) => (
  <Link
    className="bg-white rounded-lg shadow-md p-6 flex flex-col md:flex-row gap-4 hover:shadow-lg transition cursor-pointer"
    href={`/flights/${flight.id}`}
  >
    <Image
      src={flight.image}
      alt="Flight"
      width={160}
      height={120}
      className="rounded-md object-cover"
    />
    <div className="flex-1">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">
          {flight.from} → {flight.to}
        </h2>
        <span
          className={`text-sm px-3 py-1 rounded-full font-medium ${
            flight.status === "Confirmed"
              ? "bg-green-100 text-green-700"
              : "bg-yellow-100 text-yellow-700"
          }`}
        >
          {flight.status}
        </span>
      </div>
      <p className="text-sm text-gray-500 mt-1">{flight.airline}</p>
      <p className="text-sm mt-1">
        <strong>Date:</strong> {flight.date}{" "}
        {isRound && `→ ${flight.returnDate}`}
      </p>
      <p className="text-sm mt-1">
        <strong>Time:</strong> {flight.time} | <strong>Duration:</strong>{" "}
        {flight.duration} | <strong>Seats:</strong> {flight.seats}
      </p>
      <p className="text-base font-semibold text-blue-700 mt-2">
        ${flight.price} - {flight.cabin} Class
      </p>
      {flight.status === "Delayed" && (
        <p className="mt-3 text-sm bg-yellow-50 text-yellow-800 px-4 py-2 rounded">
          ⚠ {flight.delayNote}
        </p>
      )}
    </div>
  </Link>
);
