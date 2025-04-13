"use client";

import CategoryJoinButton from "@/components/CategoryJoinButton";
import Breadcrumbs from "@/components/Breadcrumbs";
import useSWR from "swr";
import { fetcher } from "@/functions/fetcher";
import Image from "next/image";
import Link from "next/link";
import { Wine } from "lucide-react";
import { APIResponse } from "@/interface/APIResponse";
import Navbar from "@/components/Navbar";
import JoinAlcoholicButton from "@/components/JoinAlcoholicButton";

const Cocktail = () => {
  const { data, error } = useSWR<APIResponse>(
    "https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Cocktail",
    fetcher
  );

  if (error) return <div>Failed to load</div>;
  if (!data) return <div className="animate-pulse text-xl text-center">Loading <span className="loading loading-dots loading-xs"></span></div>;

  return (
    <>
    <Navbar />
      <div className="flex justify-between mx-4 mt-4">
        <div className="flex items-center gap-2">
          <CategoryJoinButton />
          <JoinAlcoholicButton />
        </div>
        <div>
          <Breadcrumbs />
        </div>
      </div>

      <fieldset className="fieldset w-full bg-base-200 border border-base-300 p-4 rounded-box mt-6">
        <legend className="fieldset-legend capitalize text-lg font-semibold mb-4">
          Cocktail Recommended
        </legend>

        <div className="grid gap-6 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7">
          {data.drinks.map((drink) => (
            <div
              key={drink.idDrink}
              className="card bg-base-100 shadow-md transition-transform hover:scale-[1.02] hover:shadow-lg"
            >
              <figure className="aspect-square overflow-hidden rounded-t-box">
                <Image
                  src={drink.strDrinkThumb}
                  alt={drink.strDrink}
                  width={300}
                  height={300}
                  className="object-cover w-full h-full"
                />
              </figure>
              <div className="card-body p-4 min-h-[120px] flex flex-col justify-between">
                <h2 className="card-title text-sm font-medium">{drink.strDrink}</h2>
                <div className="card-actions justify-end mt-2">
                  <Link
                    href={`/cocktail/${drink.idDrink}`}
                    className="btn btn-primary btn-soft capitalize text-sm"
                  >
                    View Recipe <Wine className="ml-2" size={16} />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </fieldset>
    </>
  );
};

export default Cocktail;
