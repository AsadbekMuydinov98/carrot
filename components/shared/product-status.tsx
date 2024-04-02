"use client";
import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import axios from "axios";
import { baseURL } from '../../lib/config';
import { toast } from "sonner";

interface Props {
  position: string | null;
  setPosition: React.Dispatch<React.SetStateAction<string>>;
  id: string;
}

export function ProductStatus({ position, setPosition, id }: Props) {
  const handlePositionChange = (value: string) => {
    setPosition(value);
    const newState = { state: value };

    axios
    .patch(`${baseURL}/books/my/${id}`, newState)
    .then((response) => {
        console.log(response);
        toast.success(`Product status updated to "${newState.state}" successfully`);
    })
    .catch((error) => {
        console.error(error);
        toast.error("Something went wrong");
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className={
            position === "Reserved"
              ? "bg-green-500"
              : position === "Sold"
              ? "bg-gray-500"
              : ""
          }
        >
          {position}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Product status</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup
          value={position ? position : undefined}
          onValueChange={handlePositionChange}
        >
          <DropdownMenuRadioItem value="For sale">
            For sale
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="Reserved">
            Reserved
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="Sold">Sold</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
