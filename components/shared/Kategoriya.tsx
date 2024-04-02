"use client"

import * as React from "react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface Props {
  selectedCategory: string | null;
  setSelectedCategory: React.Dispatch<React.SetStateAction<string | null>>
}

export function Kategoriya({ selectedCategory, setSelectedCategory }: Props) {

  const categories = [
    { value: 'phone', label: 'Phone' },
    { value: 'laptop', label: 'Laptop' },
    { value: 'electronics', label: 'Electronics' },
    { value: 'clothes', label: 'Clothes' },
    { value: 'shoes', label: 'Shoes' },
    { value: 'kitchen tool', label: 'Kitchen Tool' },
    { value: 'tool', label: 'Tool' },
  ];

  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="w-[270]">{selectedCategory ? selectedCategory : 'Category'}</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuRadioGroup value={selectedCategory ? selectedCategory : undefined} onValueChange={handleCategoryChange}>
        {categories.map((item, index) => (
            <DropdownMenuRadioItem key={index} value={item.value}>
              {item.label}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
