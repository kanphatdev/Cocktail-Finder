import Image from "next/image";
import { Wine } from "lucide-react";
import { CocktailCardProps } from "@/interface/CocktailCard";
import Link from "next/link";



export default function CocktailCard({ drink }: CocktailCardProps) {
  return (
    <div className="card w-full bg-base-100 shadow-md hover:shadow-lg transition-shadow">
      <figure className="relative">
        <Image
          src={drink.strDrinkThumb}
          alt={drink.strDrink}
          width={300}
          height={300}
          className="w-full object-cover h-64 rounded-t-lg"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title text-lg">{drink.strDrink}</h2>
        <div className="card-actions justify-end">
          <Link href={`drinks/${drink.idDrink}`} className="btn btn-primary btn-sm flex items-center gap-2">
            View Recipe <Wine size={16} />
          </Link>
        </div>
        <div className="card-actions mt-2 flex-wrap gap-2">
          {drink.strCategory && (
            <div className="badge badge-soft badge-primary">{drink.strCategory}</div>
          )}
          {drink.strAlcoholic && (
            <div className="badge badge-soft badge-accent">{drink.strAlcoholic}</div>
          )}
          {drink.strGlass && (
            <div className="badge badge-soft badge-info">{drink.strGlass}</div>
          )}
        </div>
      </div>
    </div>
  );
}
