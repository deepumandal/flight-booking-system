"use client";

import { Plane, Calendar, ArrowRight, MapPin } from "lucide-react";
import React, { useState, useEffect, useRef } from "react";
import { Airport, FlightFormData } from "@AppTypes/FlightSearchTypes";
import { INDIAN_AIRPORTS } from "@Utils/Constants";

export const FlightSearch: React.FC = () => {
  const [formData, setFormData] = useState<FlightFormData>({
    from: "",
    to: "",
    departDate: "",
    returnDate: "",
    tripType: "roundTrip",
  });

  const [showFromSuggestions, setShowFromSuggestions] = useState(false);
  const [showToSuggestions, setShowToSuggestions] = useState(false);
  const [fromQuery, setFromQuery] = useState("");
  const [toQuery, setToQuery] = useState("");

  const fromRef = useRef<HTMLDivElement>(null);
  const toRef = useRef<HTMLDivElement>(null);

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

  const fromAirports = filterAirports(fromQuery);
  const toAirports = filterAirports(toQuery);

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const searchParams = new URLSearchParams({
      from: formData.from,
      to: formData.to,
      departDate: formData.departDate,
      returnDate: formData.tripType === "roundTrip" ? formData.returnDate : "",
      tripType: formData.tripType,
    });

    window.location.href = `/flights?${searchParams.toString()}`;
  };

  const handleAirportSelect = (airport: Airport, type: "from" | "to") => {
    const value = `${airport.city} (${airport.iata_code})`;
    if (type === "from") {
      setFormData({ ...formData, from: value });
      setFromQuery(value);
      setShowFromSuggestions(false);
    } else {
      setFormData({ ...formData, to: value });
      setToQuery(value);
      setShowToSuggestions(false);
    }
  };

  const today = new Date().toISOString().split("T")[0];

  return (
    <div className="w-full max-w-3xl bg-white rounded-2xl shadow-xl p-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 flex items-center gap-2">
        <Plane className="text-blue-600" /> Flight Search
      </h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex gap-4 mb-4 text-black items-start">
          <label className="flex items-center gap-2 cursor-pointer w-fit">
            <input
              type="radio"
              name="tripType"
              value="roundTrip"
              checked={formData.tripType === "roundTrip"}
              onChange={() =>
                setFormData({ ...formData, tripType: "roundTrip" })
              }
              className="text-blue-600"
            />
            <span>Round Trip</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer w-fit">
            <input
              type="radio"
              name="tripType"
              value="oneWay"
              checked={formData.tripType === "oneWay"}
              onChange={() => setFormData({ ...formData, tripType: "oneWay" })}
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
                required
                placeholder="Search for city or airport"
                value={fromQuery}
                onChange={(e) => {
                  setFromQuery(e.target.value);
                  setShowFromSuggestions(true);
                }}
                className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
            </div>
            {showFromSuggestions && fromQuery && fromAirports.length > 0 && (
              <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-auto">
                {fromAirports.map((airport) => (
                  <button
                    key={airport.iata_code}
                    type="button"
                    onClick={() => handleAirportSelect(airport, "from")}
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
                required
                placeholder="Search for city or airport"
                value={toQuery}
                onChange={(e) => {
                  setToQuery(e.target.value);
                  setShowToSuggestions(true);
                }}
                className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
            </div>
            {showToSuggestions && toQuery && toAirports.length > 0 && (
              <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-auto">
                {toAirports.map((airport) => (
                  <button
                    key={airport.iata_code}
                    type="button"
                    onClick={() => handleAirportSelect(airport, "to")}
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
              <Calendar className="inline w-4 h-4 mr-1 " /> Departure Date
            </label>
            <input
              type="date"
              required
              min={today}
              value={formData.departDate}
              onChange={(e) =>
                setFormData({ ...formData, departDate: e.target.value })
              }
              className="w-full px-4 py-2 border !text-black border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {formData.tripType === "roundTrip" && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 w-fit">
                <Calendar className="inline w-4 h-4 mr-1" /> Return Date
              </label>
              <input
                type="date"
                required
                min={formData.departDate || today}
                value={formData.returnDate}
                placeholder="return"
                onChange={(e) =>
                  setFormData({ ...formData, returnDate: e.target.value })
                }
                className="w-full px-4 !text-black py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 font-medium"
        >
          Search Flights <ArrowRight className="w-5 h-5" />
        </button>
      </form>
    </div>
  );
};
