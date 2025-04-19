"use client";

import { fetcher } from "@/functions/fetcher";
import { useState, useRef } from "react";
import useSWR from "swr";
import Image from "next/image";
import Link from "next/link";
import { Search } from "lucide-react";
import { useCocktailSearch } from "@/hooks/useCocktailSearch";


type Drink = {
  idDrink: string;
  strDrink: string;
  strDrinkThumb: string;
};

type APIResponse = {
  drinks: Drink[] | null;
};

const SearchCocktail = () => {
  const [cocktail, setCocktail] = useState("");
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const { handleSubmit } = useCocktailSearch(cocktail, setQuery, inputRef);

  const { data, error, isLoading } = useSWR<APIResponse>(
    query ? `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${query}` : null,
    fetcher
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCocktail(e.target.value);
  };

  return (
    <section className="max-w-6xl mx-auto px-4 py-8">
      <form onSubmit={handleSubmit}>
        <fieldset className="bg-base-200 border border-base-300 p-6 rounded-2xl shadow-sm">
          <legend className="text-xl font-semibold text-primary mb-4">Search Your Cocktail</legend>
          <div className="flex flex-col sm:flex-row items-stretch gap-4">
            <div className="relative w-full">
              <input
                ref={inputRef}
                type="text"
                value={cocktail}
                onChange={handleChange}
                className="input input-bordered w-full text-base"
                placeholder="Enter cocktail name..."
              />
              <kbd className="kbd kbd-sm absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400">
                c
              </kbd>
            </div>
            <button type="submit" className="btn btn-primary w-full sm:w-auto gap-2">
              <Search size={18} /> Search
            </button>
          </div>
        </fieldset>
      </form>

      {/* Results */}
      {error && <p className="text-red-500 mt-6 text-center">Failed to load results.</p>}
      {isLoading && <div className="flex justify-center mt-6"><span className="loading loading-spinner text-primary"></span></div>}
      {data?.drinks === null && <p className="mt-6 text-center text-sm text-gray-500">No cocktails found.</p>}

      {data?.drinks && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 mt-10">
          {data.drinks.map((drink) => (
            <div key={drink.idDrink} className="bg-base-100 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
              <figure>
                <Image
                  src={drink.strDrinkThumb}
                  alt={drink.strDrink}
                  width={400}
                  height={300}
                  className="w-full h-60 object-cover rounded-t-2xl"
                />
              </figure>
              <div className="p-4 flex flex-col justify-between h-[160px]">
                <h2 className="text-lg font-semibold text-base-content line-clamp-2">
                  {drink.strDrink}
                </h2>
                <div className="mt-auto flex justify-end">
                  <Link href={`/cocktail/${drink.idDrink}`} className="btn btn-outline btn-primary btn-sm capitalize">
                    View
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default SearchCocktail;
