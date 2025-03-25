"use client";

import { Minus, Plus, User } from "lucide-react";
import { useState } from "react";
import { Button } from "@Components/ui";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@Components/ui/Popover";
import { cn } from "@Utils/ClassName";

const cabinClasses = ["Economy", "Premium Economy", "Business", "First"];

export const SelectClass = () => {
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [infants, setInfants] = useState(0);
  const [cabin, setCabin] = useState("Economy");

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className="flex justify-between gap-2 w-fit text-left"
        >
          <User className="h-4 w-4" />
          <span>
            {adults} {adults === 1 ? "Adult" : "Adults"}
            {children > 0 &&
              `, ${children} ${children === 1 ? "Child" : "Children"}`}
            {infants > 0 &&
              `, ${infants} ${infants === 1 ? "Infant" : "Infants"}`}
            , {cabin} Class
          </span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 bg-white text-sm text-black space-y-4">
        <div className="space-y-3">
          {["Adults", "Children", "Infants"].map((type, idx) => {
            const value = [adults, children, infants][idx];
            const setValue = [setAdults, setChildren, setInfants][idx];
            const description = ["12+ Years", "2 - 12 yrs", "Below 2 yrs"][idx];
            return (
              <div key={type} className="flex justify-between items-center">
                <div>
                  <p className="font-medium">{type}</p>
                  <p className="text-xs text-muted-foreground">{description}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setValue(Math.max(0, value - 1))}
                    disabled={type === "Adults" && value === 1}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="w-4 text-center font-semibold">{value}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setValue(value + 1)}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            );
          })}
        </div>

        <div className="flex flex-wrap gap-2 pt-3">
          {cabinClasses.map((item) => (
            <Button
              key={item}
              variant="outline"
              size="sm"
              className={cn(
                "rounded-full border",
                cabin === item && "bg-black text-white border-black"
              )}
              onClick={() => setCabin(item)}
            >
              {item}
            </Button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
};
