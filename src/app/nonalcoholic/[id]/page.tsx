"use client";

import { fetcher } from "@/functions/fetcher";
import { useParams } from "next/navigation";
import useSWR from "swr";
import Image from "next/image";

const NonAlcoholicDetail = () => {
  const params = useParams();
  const drinkId = params?.id;

  const { data, error } = useSWR(
    drinkId ? `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${drinkId}` : null,
    fetcher
  );

  if (error) return <div className="text-red-500 p-4">Failed to load</div>;
  if (!data) return <div className="loading loading-spinner text-primary m-10" />;

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
          <h2 className="text-3xl font-bold text-primary mb-4">{drink.strDrink}</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-base-content">
            <div>
              <span className="font-semibold badge badge-soft badge-accent">{drink.strCategory}</span> 
            </div>
            <div>
            <span className="font-semibold badge badge-soft badge-info">
              {drink.strAlcoholic}
              </span>  
            </div>
            <div>
            <span className="font-semibold badge badge-soft badge-secondary">{drink.strGlass}</span>  
            </div>
            {drink.strTags && (
              <div>
                <span className="font-semibold badge badge-soft badge-success">{drink.strTags}</span> 
              </div>
            )}
            {drink.strIBA && (
              <div>
                <span className="font-semibold badge badge-dash badge-primary">IBA:</span> {drink.strIBA}
              </div>
            )}
          </div>

          <div className="divider mt-6 mb-2">Instructions</div>

          <div className="space-y-2">
            <p><span className="font-semibold">EN:</span> {drink.strInstructions}</p>
            {drink.strInstructionsES && <p><span className="font-semibold">ES:</span> {drink.strInstructionsES}</p>}
            {drink.strInstructionsDE && <p><span className="font-semibold">DE:</span> {drink.strInstructionsDE}</p>}
            {drink.strInstructionsFR && <p><span className="font-semibold">FR:</span> {drink.strInstructionsFR}</p>}
            {drink.strInstructionsIT && <p><span className="font-semibold">IT:</span> {drink.strInstructionsIT}</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NonAlcoholicDetail;
