"use client";

import { fetcher } from "@/functions/fetcher";
import { AlcoholicDetail } from "@/interface/Alcoholic";
import { Beer } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import useSWR from "swr";




const AlcoholicDetail = () => {
  const params = useParams();
  const id = params?.id as string;

  const { data, error } = useSWR<{ drinks: AlcoholicDetail[] }>(
    `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`,
    fetcher
  );

  if (error) return <div>❌ Failed to load</div>;

  if (!data)
    return (
      <div className="animate-bounce p-6">
        <div className="flex w-52 flex-col gap-4">
          <div className="skeleton h-32 w-full"></div>
          <div className="skeleton h-4 w-28"></div>
          <div className="skeleton h-4 w-full"></div>
          <div className="skeleton h-4 w-full"></div>
        </div>
      </div>
    );

  const drink = data.drinks[0];

  // Extract ingredients dynamically
  const ingredients = Object.keys(drink)
    .filter((key) => key.startsWith("strIngredient") && drink[key as keyof DrinkDetail])
    .map((key) => drink[key as keyof DrinkDetail]);

  return (
    <div className="card lg:card-side bg-base-100 shadow-sm mt-6">
      <figure className="lg:w-1/2  relative h-96">
        <Image
          src={drink.strDrinkThumb}
          alt={drink.strDrink}
          fill
          className="object-cover "
        />
      </figure>

      <div className="card-body">
        <h2 className="card-title text-xl">{drink.strDrink}</h2>

        <div className="flex flex-col gap-2">
          {drink.strInstructions && (
            <div className="collapse border border-base-300 bg-base-100">
              <input type="checkbox" />
              <div className="collapse-title font-semibold">Instructions (EN)</div>
              <div className="collapse-content text-sm">{drink.strInstructions}</div>
            </div>
          )}
          {drink.strInstructionsES && (
            <div className="collapse border border-base-300 bg-base-100">
              <input type="checkbox" />
              <div className="collapse-title font-semibold">Instructions (ES)</div>
              <div className="collapse-content text-sm">{drink.strInstructionsES}</div>
            </div>
          )}
          {drink.strInstructionsDE && (
            <div className="collapse border border-base-300 bg-base-100">
              <input type="checkbox" />
              <div className="collapse-title font-semibold">Instructions (DE)</div>
              <div className="collapse-content text-sm">{drink.strInstructionsDE}</div>
            </div>
          )}
          {drink.strInstructionsFR && (
            <div className="collapse border border-base-300 bg-base-100">
              <input type="checkbox" />
              <div className="collapse-title font-semibold">Instructions (FR)</div>
              <div className="collapse-content text-sm">{drink.strInstructionsFR}</div>
            </div>
          )}
          {drink.strInstructionsIT && (
            <div className="collapse border border-base-300 bg-base-100">
              <input type="checkbox" />
              <div className="collapse-title font-semibold">Instructions (IT)</div>
              <div className="collapse-content text-sm">{drink.strInstructionsIT}</div>
            </div>
          )}
        </div>

        <div className="mt-4">
          <h3 className="text-sm font-semibold mb-2">Ingredients</h3>
          <ul className="list ml-6 text-sm">
            {ingredients.map((ingredient, index) => (
              <li className="list-row" key={index}>{ingredient}</li>
            ))}
          </ul>
        </div>

        <div className="card-actions justify-start mt-4 flex-wrap gap-2">
          {drink.strTags && (
            <div className="badge badge-soft badge-primary">{drink.strTags}</div>
          )}
          <div className="badge badge-soft badge-secondary">{drink.strCategory}</div>
          <div className="badge badge-soft badge-info">{drink.strAlcoholic}</div>
          {drink.strIBA && (
            <div className="badge badge-soft badge-accent">{drink.strIBA}</div>
          )}
          <div className="badge badge-soft badge-success">{drink.strGlass}</div>
        </div>
        <div className="card-actions justify-end">
          <Link href={"."} className="btn btn-dash btn-info capitalize">
          
          back steps <Beer/>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AlcoholicDetail;
