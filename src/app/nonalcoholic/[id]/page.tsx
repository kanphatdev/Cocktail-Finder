"use client";

import { fetcher } from "@/functions/fetcher";
import { useParams } from "next/navigation";
import useSWR from "swr";
import Image from "next/image";
import Link from "next/link";
import { Beer } from "lucide-react";

const NonAlcoholicDetail = () => {
  const params = useParams();
  const drinkId = params?.id;

  const { data, error } = useSWR(
    drinkId
      ? `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${drinkId}`
      : null,
    fetcher
  );

  if (error) return <div className="text-red-500 p-4">Failed to load</div>;
  if (!data)
    return <div className="loading loading-spinner text-primary m-10" />;

  const drink = data.drinks?.[0];

  if (!drink) return <div className="text-gray-500">No drink found.</div>;

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="bg-base-100 shadow-xl rounded-3xl overflow-hidden flex flex-col lg:flex-row gap-6">
        {/* Image */}
        <div className="flex-shrink-0">
          <Image
            src={drink.strDrinkThumb}
            alt={drink.strDrink}
            width={500}
            height={500}
            className="object-cover h-full w-full max-h-[500px] lg:rounded-l-3xl"
          />
        </div>

        {/* Details */}
        <div className="p-6 flex-1">
          <h2 className="text-3xl font-bold text-primary mb-4">
            {drink.strDrink}
          </h2>
          <div className="card-actions justify-start">
            <div className="badge badge-dash badge-primary">
              {drink.strCategory}
            </div>
            <div className="badge badge-dash badge-secondary">
              {drink.strAlcoholic}
            </div>
            <div className="badge badge-dash badge-accent">
              {drink.strGlass}
            </div>
            {drink.strTags && (
              <div>
                <span className="badge badge-dash badge-info">
                  {drink.strTags}
                </span>
              </div>
            )}
            {drink.strIBA && (
              <div>
                <span className="badge badge-dash badge-success">
                  {drink.strIBA}
                </span>
              </div>
            )}
          </div>

        

          <div className="divider mt-6 mb-2">Instructions</div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <fieldset className="fieldset w-full bg-base-200 border border-base-300 p-4 rounded-box">
              <legend className="fieldset-legend uppercase">en</legend>
              <p className="fieldset-label">{drink.strInstructions}</p>
            </fieldset>
            {drink.strInstructionsES && (
              <fieldset className="fieldset w-full bg-base-200 border border-base-300 p-4 rounded-box">
                <legend className="fieldset-legend uppercase">es</legend>
                <p className="fieldset-label">{drink.strInstructionsES}</p>
              </fieldset>
            )}
            {drink.strInstructionsDE && (
              <fieldset className="fieldset w-full bg-base-200 border border-base-300 p-4 rounded-box">
                <legend className="fieldset-legend uppercase">de</legend>
                <p className="fieldset-label">{drink.strInstructionsDE}</p>
              </fieldset>
            )}
            {drink.strInstructionsFR && (
              <fieldset className="fieldset w-full bg-base-200 border border-base-300 p-4 rounded-box">
                <legend className="fieldset-legend uppercase">fr</legend>
                <p className="fieldset-label">{drink.strInstructionsFR}</p>
              </fieldset>
            )}
            {drink.strInstructionsIT && (
              <fieldset className="fieldset w-full bg-base-200 border border-base-300 p-4 rounded-box">
                <legend className="fieldset-legend uppercase">it</legend>
                <p className="fieldset-label">{drink.strInstructionsIT}</p>
              </fieldset>
            )}
          </div>
          <div className="card-actions justify-end">
            <Link href={"."} className="btn btn-dash btn-accent capitalize">back steps <Beer /> </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NonAlcoholicDetail;
