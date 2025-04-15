"use client";

import Breadcrumbs from "@/components/Breadcrumbs";
import CategoryJoinButton from "@/components/CategoryJoinButton";
import JoinAlcoholicButton from "@/components/JoinAlcoholicButton";
import Navbar from "@/components/Navbar";
import { fetcher } from "@/functions/fetcher";
import { NonAlcoholicDrink } from "@/interface/NonAlcoholic";
import { CupSoda } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import useSWR from "swr";



type APIResponse = {
  drinks: NonAlcoholicDrink[];
};

const NonAlcoholic = () => {
  const { data, error } = useSWR<APIResponse>(
    "https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=Non_Alcoholic",
    fetcher
  );

  if (error) return <div>Failed to load</div>;
  if (!data)
    return (
      <div className="animate-bounce">
        <div className="flex w-52 flex-col gap-4">
          <div className="skeleton h-32 w-full"></div>
          <div className="skeleton h-4 w-28"></div>
          <div className="skeleton h-4 w-full"></div>
          <div className="skeleton h-4 w-full"></div>
        </div>
      </div>
    );

  return (
    <>
      <Navbar />
      <div className="flex items-center justify-between mx-4 mt-4">
        <div className="flex gap-4">
          <CategoryJoinButton />
          <JoinAlcoholicButton />
        </div>
        <div>
          <Breadcrumbs />
        </div>
      </div>
      <fieldset className="bg-base-100 p-6 rounded-3xl shadow-lg border border-base-300 mt-6">
  <legend className="text-xl font-bold text-primary px-2 flex items-center gap-2">
    <CupSoda className="w-5 h-5" />
    Non-Alcoholic Drinks
  </legend>

  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 mt-6">
    {data.drinks.map((drink) => (
      <div
        className="bg-base-100 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden"
        key={drink.idDrink}
      >
        <figure>
          <Image
            src={drink.strDrinkThumb}
            alt={drink.strDrink}
            width={400}
            height={300}
            className="w-full h-64 object-cover"
          />
        </figure>
        <div className="p-4 flex flex-col justify-between h-[160px]">
          <h2 className="text-lg font-semibold text-base-content line-clamp-2">
            {drink.strDrink}
          </h2>
          <div className="mt-auto flex justify-end">
            <Link
              href={`/nonalcoholic/${drink.idDrink}`}
              className="btn btn-sm btn-primary btn-outline gap-2"
            >
              View Recipe <CupSoda size={16} />
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

export default NonAlcoholic;
