"use client";

import { fetcher } from "@/functions/fetcher";
import { useState, useRef } from "react";
import useSWR from "swr";
import { Search } from "lucide-react";

type Ingredient = {
  idIngredient: string;
  strIngredient: string;
  strDescription: string;
  strType: string;
  strAlcohol: string;
  strABV: string;
};

type APIResponse = {
  ingredients: Ingredient[] | null;
};

const SearchIngredient = () => {
  const [ingredient, setIngredient] = useState("");
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIngredient(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setQuery(ingredient.trim());
  };

  const { data, error, isLoading } = useSWR<APIResponse>(
    query ? `https://www.thecocktaildb.com/api/json/v1/1/search.php?i=${query}` : null,
    fetcher
  );

  return (
    <div className="container mx-auto max-w-2xl p-4">
      <form onSubmit={handleSubmit}>
        <fieldset className="bg-base-200 border border-base-300 p-6 rounded-box shadow-md">
          <legend className="text-lg font-semibold mb-4">Search Ingredient</legend>
          <div className="join w-full">
            <input
              ref={inputRef}
              type="text"
              value={ingredient}
              onChange={handleChange}
              className="input input-bordered join-item w-full"
              placeholder="Enter ingredient name..."
            />
            <button type="submit" className="btn btn-primary join-item">
              <Search size={18} />
              Search
            </button>
          </div>
        </fieldset>
      </form>

      {error && <div className="mt-4 text-red-500">Failed to load data.</div>}
      {isLoading && <div className="loading loading-spinner text-primary mt-4" />}
      {data?.ingredients === null && (
        <div className="mt-4 text-center text-sm text-gray-500">No ingredient found.</div>
      )}

      {data?.ingredients?.map((item) => (
        <div key={item.idIngredient} className="card bg-base-100 shadow-md mt-6">
          <div className="card-body">
            <h2 className="card-title capitalize">{item.strIngredient}</h2>
            <p className="text-sm text-base-content">{item.strDescription || "No description available."}</p>
            <div className="card-actions justify-end mt-2 flex flex-wrap gap-2">
              {item.strType && (
                <div className="badge badge-primary badge-outline">{item.strType}</div>
              )}
              {item.strAlcohol && (
                <div className="badge badge-secondary badge-outline">{item.strAlcohol}</div>
              )}
              {item.strABV && (
                <div className="badge badge-accent badge-outline">{item.strABV}% ABV</div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SearchIngredient;
