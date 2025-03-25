"use client";

import { format } from "date-fns";
import { useState } from "react";
import { Calendar } from "@Components/ui/Calender";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@Components/ui/Popover";
import { cn } from "@Utils/ClassName";
import { SelectClass } from "./SelectClass";

export const FlightSearch = () => {
  const [tripType, setTripType] = useState("oneway");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [startDate, setStartDate] = useState<Date | undefined>(new Date());
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const departDate = startDate ? format(startDate, "yyyy-MM-dd") : "";
    const returnDate = endDate ? format(endDate, "yyyy-MM-dd") : "";
    console.log({ from, to, departDate, returnDate, tripType });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-4 grid gap-4 overflow-hidden rounded-xl"
    >
      <div className="flex justify-between items-center">
        <div className="flex flex-wrap gap-2 text-sm font-medium text-gray-700">
          <button
            type="button"
            className={cn(
              "px-3 py-1 border rounded-full",
              tripType === "oneway"
                ? "bg-blue-600 text-white"
                : "bg-white border-gray-300"
            )}
            onClick={() => {
              setTripType("oneway");
              setEndDate(undefined);
            }}
          >
            One way
          </button>
          <button
            type="button"
            className={cn(
              "px-3 py-1 border rounded-full",
              tripType === "round"
                ? "bg-blue-600 text-white"
                : "bg-white border-gray-300"
            )}
            onClick={() => setTripType("round")}
          >
            Round trip
          </button>
        </div>
        <SelectClass />
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        <input
          type="text"
          value={from}
          onChange={(e) => setFrom(e.target.value)}
          placeholder="Where from?"
          className="p-3 border border-gray-300 rounded-md w-full text-black"
          required
        />
        <input
          type="text"
          value={to}
          onChange={(e) => setTo(e.target.value)}
          placeholder="Where to?"
          className="p-3 border text-black border-gray-300 rounded-md w-full"
          required
        />
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <Popover>
          <PopoverTrigger asChild>
            <button
              type="button"
              className="p-3 border border-gray-300 rounded-md w-full text-left"
            >
              {startDate ? format(startDate, "PPP") : "Departure"}
            </button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0 bg-white shadow-md rounded-md text-black">
            <Calendar
              mode="single"
              selected={startDate}
              onSelect={setStartDate}
              initialFocus
            />
          </PopoverContent>
        </Popover>

        <Popover>
          <PopoverTrigger asChild>
            <button
              type="button"
              className="p-3 border border-gray-300 rounded-md w-full text-left"
            >
              {endDate ? format(endDate, "PPP") : "Return (optional)"}
            </button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0 bg-white shadow-md rounded-md text-black">
            <Calendar
              mode="single"
              selected={endDate}
              onSelect={setEndDate}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>

      <div className="pt-2">
        <button
          type="submit"
          className="w-full py-3 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-md transition"
        >
          Search flights
        </button>
      </div>
    </form>
  );
};
