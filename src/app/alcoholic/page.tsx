"use client";

import Breadcrumbs from "@/components/Breadcrumbs";
import CategoryJoinButton from "@/components/CategoryJoinButton";
import JoinAlcoholicButton from "@/components/JoinAlcoholicButton";
import Navbar from "@/components/Navbar";
import { fetcher } from "@/functions/fetcher";
import { AlcoholicDrink } from "@/interface/Alcoholic";
import { Wine } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import useSWR from "swr";



const Alcoholic = () => {
  const { data, error } = useSWR<{ drinks: AlcoholicDrink[] }>(
    "https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=Alcoholic",
    fetcher
  );

  if (error) return <div>❌ Failed to load</div>;

  if (!data)
    return (
      <div className="flex items-center gap-2 p-6 animate-pulse text-primary">
        Loading <span className="loading loading-ring loading-lg" />{" "}
        <Wine className="animate-spin" />
      </div>
    );

  return (
    <>
      <Navbar />

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mt-4">
        <div className="flex gap-2">
          <JoinAlcoholicButton />
          <CategoryJoinButton />
        </div>
        <Breadcrumbs />
      </div>

      <fieldset className="fieldset w-full bg-base-200 border border-base-300 p-4 rounded-box mt-6">
        <legend className="fieldset-legend capitalize">Alcoholic Drinks</legend>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-4">
          {data.drinks.map((drink) => (
            <div
              key={drink.idDrink}
              className="card bg-base-100 shadow-md hover:shadow-xl transition"
            >
              <figure className="relative h-52">
                <Image
                  src={drink.strDrinkThumb}
                  alt={drink.strDrink}
                  fill
                  className="object-cover"
                />
              </figure>

              <div className="card-body">
                <h2 className="card-title text-base">{drink.strDrink}</h2>
                <div className="card-actions justify-end">
                  <Link
                    href={`/alcoholic/${drink.idDrink}`}
                    className="btn btn-primary btn-soft btn-sm"
                  >
                    Recipe <Wine className="w-4 h-4 ml-1" />
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

export default Alcoholic;
