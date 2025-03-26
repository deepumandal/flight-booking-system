"use client";

import { useMutation } from "@tanstack/react-query";
import { AnyType } from "@AppTypes/AnyType";
import { Toaster } from "@Components/ui/Toaster";
import { bookingControllerCreate, CreateBookingDto } from "src/sdk";

// eslint-disable-next-line no-unused-vars
export const useBookingService = (cb: (id: string) => void) => {
  const mutation = useMutation({
    mutationFn: async (data: CreateBookingDto) => bookingControllerCreate(data),
    onSuccess: (resp: AnyType) => {
      console.log("resp", resp);
      Toaster({ message: "Booking successful!", type: "success" });
      const id = resp?.data?.booking?.id;
      cb(id);
    },
    onError: (error: any) => {
      console.error("❌ Booking error:", error);
    },
  });

  return {
    bookFlight: mutation.mutate,
    isLoading: mutation.isPending,
    isSuccess: mutation.isSuccess,
    isError: mutation.isError,
    error: mutation.error,
    data: mutation.data,
  };
};
