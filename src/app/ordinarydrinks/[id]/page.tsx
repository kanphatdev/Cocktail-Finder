"use client";

import { fetcher } from "@/functions/fetcher";
import { useParams } from "next/navigation";
import useSWR from "swr";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { OrdinaryDrink } from "@/interface/OrdinaryDrink";



const OrdinaryDrinksDetail = () => {
  const params = useParams();
  const { data, error } = useSWR<{ drinks: OrdinaryDrink[] }>(
    `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${params.id}`,
    fetcher
  );

  if (error)
    return <div className="text-error text-center p-6">❌ Failed to load</div>;
  if (!data)
    return (
      <div className="p-6 flex justify-center">
        <div className="w-60 space-y-4 animate-pulse">
          <div className="skeleton h-32 w-full"></div>
          <div className="skeleton h-4 w-28"></div>
          <div className="skeleton h-4 w-full"></div>
          <div className="skeleton h-4 w-full"></div>
        </div>
      </div>
    );

  const drink = data.drinks[0];

  const ingredients = Array.from({ length: 15 }, (_, i) => {
    const ingredient = drink[`strIngredient${i + 1}`];
    const measure = drink[`strMeasure${i + 1}`];
    return ingredient ? `${measure || ""} ${ingredient}`.trim() : null;
  }).filter(Boolean);

  const instructions = [
    { language: "English", text: drink.strInstructions },
    { language: "Spanish", text: drink.strInstructionsES },
    { language: "German", text: drink.strInstructionsDE },
    { language: "French", text: drink.strInstructionsFR },
    { language: "Italian", text: drink.strInstructionsIT },
  ].filter((instruction) => instruction.text);

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <Link href="." className="btn btn-outline btn-sm mb-4">
        <ArrowLeft className="w-4 h-4 mr-1" /> Back
      </Link>

      <div className="card bg-base-100 shadow-xl overflow-hidden">
        <div className="grid md:grid-cols-2">
          <figure>
            <Image
              src={drink.strDrinkThumb}
              alt={drink.strDrink}
              width={600}
              height={600}
              className="w-full h-full object-cover"
            />
          </figure>

          <div className="card-body space-y-4">
            <h2 className="card-title text-3xl">{drink.strDrink}</h2>
            <div className="space-x-2">
              <span className="badge badge-info badge-outline">
                {drink.strCategory}
              </span>
              <span className="badge badge-success badge-outline">
                {drink.strAlcoholic}
              </span>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-base-content/70 uppercase tracking-wide mb-2">
                Ingredients
              </h3>
              <ul className="list ml-5 space-y-1 text-sm">
                {ingredients.map((item, idx) => (
                  <li key={idx} className="list-row">{item}</li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-base-content/70 uppercase tracking-wide mb-2">
                Instructions
              </h3>
              <p className="text-sm">{drink.strInstructions}</p>
            </div>
          </div>
        </div>
      </div>

      {instructions.length > 1 && (
        <div className="mt-10">
          <h3 className="text-lg font-semibold mb-4">Multilingual Instructions</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {instructions
              .filter((ins) => ins.language !== "English")
              .map((instruction, idx) => (
                <div key={idx} className="card bg-base-200 shadow-sm">
                  <div className="card-body">
                    <h4 className="card-title">{instruction.language}</h4>
                    <p className="text-sm">{instruction.text}</p>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default OrdinaryDrinksDetail;
