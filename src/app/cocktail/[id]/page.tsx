"use client";

import { fetcher } from "@/functions/fetcher";
import { CocktailDetailResponse } from "@/interface/CocktailDetail";
import { Beer } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import useSWR from "swr";


const CocktailDetail = () => {
  const params = useParams();
  const { data, error, isLoading } = useSWR<CocktailDetailResponse>(
    `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${params.id}`,
    fetcher
  );

  if (isLoading)
    return (
      <div className="flex w-52 flex-col gap-4">
        <div className="skeleton h-32 w-full"></div>
        <div className="skeleton h-4 w-28"></div>
        <div className="skeleton h-4 w-full"></div>
        <div className="skeleton h-4 w-full"></div>
      </div>
    );

  if (error) return <div>Error: {error.message}</div>;

  const cocktail = data?.drinks?.[0];

  if (!cocktail) return <div>No cocktail found.</div>;

  return (
    <div className="card lg:card-side bg-base-100 shadow-sm">
      <figure>
        <Image
          src={cocktail.strDrinkThumb}
          alt={cocktail.strDrink}
          width={400}
          height={400}
          className="object-cover"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title text-2xl font-bold">{cocktail.strDrink}</h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 my-4">
          {cocktail.strInstructions && (
            <CardInstruction title="Instructions" text={cocktail.strInstructions} />
          )}
          {cocktail.strInstructionsES && (
            <CardInstruction title="Spanish" text={cocktail.strInstructionsES} />
          )}
          {cocktail.strInstructionsDE && (
            <CardInstruction title="German" text={cocktail.strInstructionsDE} />
          )}
          {cocktail.strInstructionsFR && (
            <CardInstruction title="French" text={cocktail.strInstructionsFR} />
          )}
          {cocktail.strInstructionsIT && (
            <CardInstruction title="Italian" text={cocktail.strInstructionsIT} />
          )}
        </div>

        <div className="card-actions justify-start flex-wrap gap-2">
            {cocktail.strCategory && (
            <div className="badge badge-secondary badge-dash">{cocktail.strCategory}</div>
            )}
            {cocktail.strIBA && (
            <div className="badge badge-primary badge-dash">{cocktail.strIBA}</div>
            )}
            {cocktail.strTags && (
            <div className="badge badge-accent badge-dash">{cocktail.strTags}</div>
            )}
            {cocktail.strAlcoholic && (
            <div className="badge badge-info badge-dash">{cocktail.strAlcoholic}</div>
            )}
            {cocktail.strGlass && (
            <div className="badge badge-success badge-dash">{cocktail.strGlass}</div>
            )}
        </div>
<div className="card-actions justify-end mt-4">
<Link href={"."} className="btn btn-dash capitalize">back steps  <Beer /></Link>
</div>
        <div className="mt-6">
         
          <ul className="list ml-5 space-y-1 text-sm">
          <li className="p-4 pb-2 text-xs opacity-60 tracking-wide">Ingredients</li>
            {Array.from({ length: 15 }, (_, i) => {
              const ingredient = cocktail[`strIngredient${i + 1}`];
              const measure = cocktail[`strMeasure${i + 1}`];
              if (ingredient) {
                return (
                  <li key={i} className="list-row">
                    {measure ? `${measure} ` : ""}{ingredient}
                  </li>
                );
              }
              return null;
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CocktailDetail;

const CardInstruction = ({
  title,
  text,
}: {
  title: string;
  text: string;
}) => (
  <div className="card card-bordered bg-base-100">
    <div className="card-body">
      <h2 className="card-title">{title}</h2>
      <p className="text-sm">{text}</p>
    </div>
  </div>
);
