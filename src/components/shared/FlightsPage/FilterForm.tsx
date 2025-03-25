import { AnyType } from "@AppTypes/AnyType";

export const FlightFilterForm = ({
  searchParams,
  setSearchParams,
}: {
  searchParams: AnyType;
  setSearchParams: AnyType;
}) => (
  <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-4 mb-10">
    <input
      type="text"
      placeholder="Origin (e.g., JFK)"
      value={searchParams.origin}
      onChange={(e) =>
        setSearchParams({ ...searchParams, origin: e.target.value })
      }
      className="p-2 border rounded w-full"
    />
    <input
      type="text"
      placeholder="Destination (e.g., LHR)"
      value={searchParams.destination}
      onChange={(e) =>
        setSearchParams({ ...searchParams, destination: e.target.value })
      }
      className="p-2 border rounded w-full"
    />
    <input
      type="date"
      value={searchParams.departureDate}
      onChange={(e) =>
        setSearchParams({ ...searchParams, departureDate: e.target.value })
      }
      className="p-2 border rounded w-full"
    />
    <input
      type="date"
      value={searchParams.returnDate}
      onChange={(e) =>
        setSearchParams({ ...searchParams, returnDate: e.target.value })
      }
      className="p-2 border rounded w-full"
      disabled={searchParams.type === "oneway"}
    />
    <select
      value={searchParams.type}
      onChange={(e) =>
        setSearchParams({ ...searchParams, type: e.target.value })
      }
      className="p-2 border rounded w-full"
    >
      <option value="oneway">One-way</option>
      <option value="round">Round-trip</option>
    </select>
    <input
      type="number"
      min={1}
      placeholder="Passengers"
      value={searchParams.passengers}
      onChange={(e) =>
        setSearchParams({ ...searchParams, passengers: +e.target.value })
      }
      className="p-2 border rounded w-full"
    />
    <select
      value={searchParams.cabin}
      onChange={(e) =>
        setSearchParams({ ...searchParams, cabin: e.target.value })
      }
      className="p-2 border rounded w-full"
    >
      <option>Economy</option>
      <option>Premium Economy</option>
      <option>Business</option>
      <option>First</option>
    </select>
  </div>
);
