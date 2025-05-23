"use client";

import { fetcher } from "@/functions/fetcher";
import useSWR from "swr";
import { useState } from "react";
import CocktailCard from "@/components/CocktailCard";
import AlphabetDropdown from "@/components/AlphabetDropdown";
import CategoryJoinButton from "@/components/CategoryJoinButton";

export default function Home() {
  const [selectedLetter, setSelectedLetter] = useState("a");

  const { data, error } = useSWR(
    `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${selectedLetter}`,
    fetcher
  );

  if (error)
    return (
      <div className="text-error text-center mt-10">❌ Failed to load</div>
    );

  if (!data)
    return (
      <div className="text-center mt-10 animate-bounce">
        <div className="flex w-52 flex-col gap-4">
          <div className="skeleton h-32 w-full"></div>
          <div className="skeleton h-4 w-28"></div>
          <div className="skeleton h-4 w-full"></div>
          <div className="skeleton h-4 w-full"></div>
        </div>
      </div>
    );

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
        <h1 className="text-3xl font-bold text-center md:text-left">
          🍸 Cocktail Finder
        </h1>
        <div className="flex gap-4 items-center">
          <CategoryJoinButton />
          <AlphabetDropdown
            selectedLetter={selectedLetter}
            setSelectedLetter={setSelectedLetter}
          />
        </div>
      </div>

      <fieldset className="border border-base-300 rounded-box p-6 bg-base-200">
        <legend className="text-lg font-semibold mb-4">
          List all cocktails by first letter
        </legend>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
            {data.drinks?.map((drink: { idDrink: string; [key: string]: unknown }) => (
            <CocktailCard key={drink.idDrink} drink={drink} />
            ))}
        </div>
      </fieldset>
    </main>
  );
}
