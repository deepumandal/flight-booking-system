"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Calendar, ArrowRight, MapPin } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Airport } from "@AppTypes/FlightSearchTypes";
import { useFlightService } from "@Components/hooks/useFilterFlightService";
import { Button } from "@Components/ui";
import { INDIAN_AIRPORTS } from "@Utils/Constants";
import { FlightsControllerFindAllParams } from "src/sdk";

const formSchema = z
  .object({
    origin: z.string().min(1, "Origin is required"),
    destination: z.string().min(1, "Destination is required"),
    startDate: z.string().min(1, "Start date is required"),
    endDate: z.string().optional(),
    isRoundTrip: z.boolean(),
  })
  .superRefine((data, ctx) => {
    if (data.isRoundTrip && !data.endDate) {
      ctx.addIssue({
        code: "custom",
        message: "Return date is required for round trips",
        path: ["endDate"],
      });
    }
  });

export const FlightFilters = () => {
  const { filters, handleFilters, isFetching } = useFlightService();
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      isRoundTrip: false,
      origin: "",
      destination: "",
      startDate: "",
      endDate: "",
      ...filters,
    },
  });

  const isRoundTrip = watch("isRoundTrip");
  const origin = watch("origin");
  const destination = watch("destination");

  const fromRef = useRef<HTMLDivElement>(null);
  const toRef = useRef<HTMLDivElement>(null);
  const [showFromSuggestions, setShowFromSuggestions] = useState(false);
  const [showToSuggestions, setShowToSuggestions] = useState(false);

  const filterAirports = (query: string): Airport[] => {
    const searchTerm = query.toLowerCase();
    return INDIAN_AIRPORTS.filter(
      (airport) =>
        airport.city.toLowerCase().includes(searchTerm) ||
        airport.iata_code.toLowerCase().includes(searchTerm) ||
        airport.name.toLowerCase().includes(searchTerm) ||
        airport.state.toLowerCase().includes(searchTerm)
    );
  };

  const fromAirports = filterAirports(origin);
  const toAirports = filterAirports(destination);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (fromRef.current && !fromRef.current.contains(event.target as Node)) {
        setShowFromSuggestions(false);
      }
      if (toRef.current && !toRef.current.contains(event.target as Node)) {
        setShowToSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    const payload: FlightsControllerFindAllParams = {
      origin: data.origin.split("(")[0].trim(),
      destination: data.destination.split("(")[0].trim(),
      startDate: data.startDate,
      endDate: data.isRoundTrip ? data.endDate : undefined,
      isRoundTrip: data.isRoundTrip,
    };

    handleFilters(payload);
    console.log("Submitted Payload:", payload);
  };

  const handleAirportSelect = (
    airport: Airport,
    type: "origin" | "destination"
  ) => {
    const value = `${airport.city} (${airport.iata_code})`;
    setValue(type, value);
    if (type === "origin") {
      setShowFromSuggestions(false);
    } else {
      setShowToSuggestions(false);
    }
  };

  const today = new Date().toISOString().split("T")[0];

  return (
    <div className="w-full bg-white rounded-2xl shadow-xl p-8">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="flex gap-4 mb-4 text-black items-start">
          <label className="flex items-center gap-2 cursor-pointer w-fit">
            <input
              type="radio"
              checked={isRoundTrip === true}
              onChange={() => setValue("isRoundTrip", true)}
              className="text-blue-600"
            />
            <span>Round Trip</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer w-fit">
            <input
              type="radio"
              checked={isRoundTrip === false}
              onChange={() => setValue("isRoundTrip", false)}
              className="text-blue-600"
            />
            <span>One Way</span>
          </label>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-black">
          <div className="relative" ref={fromRef}>
            <label className="block text-sm font-medium text-gray-700 mb-1 w-fit">
              From
            </label>
            <div className="relative">
              <input
                type="text"
                placeholder="Search for city or airport"
                {...register("origin")}
                value={origin}
                onChange={(e) => {
                  setValue("origin", e.target.value);
                  setShowFromSuggestions(true);
                }}
                className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
            </div>
            {showFromSuggestions && origin && fromAirports.length > 0 && (
              <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-auto">
                {fromAirports.map((airport) => (
                  <button
                    key={airport.iata_code}
                    type="button"
                    onClick={() => handleAirportSelect(airport, "origin")}
                    className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center gap-2"
                  >
                    <MapPin className="w-4 h-4 text-gray-400" />
                    <div>
                      <div className="font-medium">
                        {airport.city} ({airport.iata_code})
                      </div>
                      <div className="text-sm text-gray-500">
                        {airport.name}, {airport.state}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="relative" ref={toRef}>
            <label className="block text-sm font-medium text-gray-700 mb-1 w-fit">
              To
            </label>
            <div className="relative">
              <input
                type="text"
                placeholder="Search for city or airport"
                {...register("destination")}
                value={destination}
                onChange={(e) => {
                  setValue("destination", e.target.value);
                  setShowToSuggestions(true);
                }}
                className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
            </div>
            {showToSuggestions && destination && toAirports.length > 0 && (
              <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-auto">
                {toAirports.map((airport) => (
                  <button
                    key={airport.iata_code}
                    type="button"
                    onClick={() => handleAirportSelect(airport, "destination")}
                    className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center gap-2"
                  >
                    <MapPin className="w-4 h-4 text-gray-400" />
                    <div>
                      <div className="font-medium">
                        {airport.city} ({airport.iata_code})
                      </div>
                      <div className="text-sm text-gray-500">
                        {airport.name}, {airport.state}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 w-fit">
              <Calendar className="inline w-4 h-4 mr-1" /> Departure Date
            </label>
            <input
              type="date"
              min={today}
              {...register("startDate")}
              className="w-full px-4 py-2 border !text-black border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            {errors.startDate && (
              <p className="text-sm text-red-600 mt-1">
                {errors.startDate.message}
              </p>
            )}
          </div>

          {isRoundTrip && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 w-fit">
                <Calendar className="inline w-4 h-4 mr-1" /> Return Date
              </label>
              <input
                type="date"
                min={watch("startDate") || today}
                {...register("endDate")}
                className="w-full px-4 !text-black py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              {errors.endDate && (
                <p className="text-sm text-red-600 mt-1">
                  {errors.endDate.message}
                </p>
              )}
            </div>
          )}
        </div>

        <Button
          loading={isFetching}
          type="submit"
          className="w-full bg-blue-600 text-white py-6 px-6 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 font-medium"
        >
          Search Flights <ArrowRight className="w-5 h-5" />
        </Button>
      </form>
    </div>
  );
};
