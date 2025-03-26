"use client";

import { useQuery } from "@tanstack/react-query";
import { useEffect, useRef } from "react";
import { AnyType } from "@AppTypes/AnyType";
import { FlightInterface } from "@AppTypes/FlightSearchTypes";
import { setFilters, setFetchedFlights } from "@Store/slices/flightSlice";
import { useAppDispatch, useAppSelector } from "@Store/store";
import {
  flightsControllerFindAll,
  FlightsControllerFindAllParams,
} from "src/sdk";

// ✅ Utility to check if filters are valid
const areFiltersValid = (filters: FlightsControllerFindAllParams): boolean =>
  !!(
    filters.origin?.trim() &&
    filters.destination?.trim() &&
    filters.startDate?.trim()
  );

export const useFlightService = () => {
  const { filters } = useAppSelector((store) => store.flight);
  const dispatch = useAppDispatch();
  const firstCallMade = useRef(false);

  // ✅ Manual TanStack Query
  const { data, refetch, isFetching, isLoading, error } = useQuery<AnyType>({
    queryKey: ["FlightsControllerFindAll", filters],
    queryFn: () => flightsControllerFindAll(filters),
    enabled: false, // we’ll call it manually
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });

  // ✅ When data is fetched, store in Redux
  useEffect(() => {
    if (data && firstCallMade.current && areFiltersValid(filters)) {
      const flights: FlightInterface[] = data?.data?.outboundFlights || [];
      const returnFlights: FlightInterface[] = data?.data?.returnFlights || [];

      dispatch(setFetchedFlights({ flights, returnFlights }));
    }
  }, [data, filters, dispatch]);

  // ✅ Triggered by UI
  const handleFilters = async (payload: FlightsControllerFindAllParams) => {
    if (!areFiltersValid(payload)) {
      console.warn("❌ Invalid filters — skipping fetch");
      return;
    }

    dispatch(setFilters(payload));
    firstCallMade.current = true;

    // Wait for Redux update and trigger fetch
    setTimeout(() => {
      refetch();
    }, 0);
  };

  return {
    response: { data },
    filters,
    isLoading,
    isFetching,
    error,
    handleFilters,
  };
};
