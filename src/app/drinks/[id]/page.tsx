"use client";

import { fetcher } from "@/functions/fetcher";
import { DetailDrinks } from "@/interface/DetailDrinks";
import Image from "next/image";
import { useParams } from "next/navigation";
import useSWR from "swr";

type APIResponse = {
  drinks: DetailDrinks[];
};

const DrinksDetail = () => {
  const params = useParams();
  const drinkId = Array.isArray(params?.id) ? params.id[0] : params?.id;

  const { data, error } = useSWR<APIResponse>(
    drinkId
      ? `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${drinkId}`
      : null,
    fetcher
  );

  if (error) return <div className="text-error text-center mt-10">❌ Failed to load</div>;
  if (!data) return <div className="text-center mt-10">
    <div className="flex w-52 flex-col gap-4">
      <div className="skeleton h-32 w-full"></div>
      <div className="skeleton h-4 w-28"></div>
      <div className="skeleton h-4 w-full"></div>
      <div className="skeleton h-4 w-full"></div>
    </div>
  </div>;

  const drink = data.drinks?.[0];

  const getIngredients = () => {
    const ingredients = [];
    for (let i = 1; i <= 15; i++) {
      const ingredient = drink[`strIngredient${i}`];
      const measure = drink[`strMeasure${i}`];
      if (ingredient) {
        ingredients.push({
          name: ingredient,
          measure: measure || "",
          image: `https://www.thecocktaildb.com/images/ingredients/${ingredient}-Small.png`,
        });
      }
    }
    return ingredients;
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="card card-side bg-base-100 shadow-sm">
        <figure className="p-4">
          <div className="avatar">
            <div className="w-48 rounded-xl">
              <Image
                src={drink.strDrinkThumb || "/placeholder-drink.png"}
                alt={drink.strDrink}
                width={300}
                height={300}
                className="object-cover"
              />
            </div>
          </div>
        </figure>

        <div className="card-body">
          <h2 className="card-title">{drink.strDrink}</h2>

          <div className="flex flex-wrap gap-4">
            {["strInstructions", "strInstructionsES", "strInstructionsDE", "strInstructionsFR", "strInstructionsIT"].map((langKey) =>
              drink[langKey] ? (
                <fieldset key={langKey} className="bg-base-200 border border-base-300 p-4 rounded-box w-xs">
                  <legend className="font-semibold">{langKey.replace("strInstructions", "") || "EN"}</legend>
                  <p>{drink[langKey]}</p>
                </fieldset>
              ) : null
            )}
          </div>

          <ul className="mt-4 space-y-3">
            <li className="text-sm font-semibold">Ingredients</li>
            {getIngredients().map((ing, index) => (
              <li key={index} className="flex items-center gap-4">
                <img src={ing.image} alt={ing.name} className="w-10 h-10 rounded-box" />
                <div>
                  <div>{ing.name}</div>
                  <div className="text-xs text-muted">{ing.measure}</div>
                </div>
              </li>
            ))}
          </ul>

          <div className="card-actions justify-end">
            {drink.strTags && <div className="badge badge-soft badge-primary">{drink.strTags}</div>}
          </div>
          <div className="card-actions justify-start flex-wrap gap-2">
            {drink.strCategory && <div className="badge badge-soft badge-secondary">{drink.strCategory}</div>}
            {drink.strIBA && <div className="badge badge-soft badge-accent">{drink.strIBA}</div>}
            {drink.strAlcoholic && <div className="badge badge-soft badge-info">{drink.strAlcoholic}</div>}
            {drink.strGlass && <div className="badge badge-soft badge-success">{drink.strGlass}</div>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DrinksDetail;
