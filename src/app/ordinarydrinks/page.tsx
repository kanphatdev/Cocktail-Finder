"use client"

import Breadcrumbs from "@/components/Breadcrumbs"
import CategoryJoinButton from "@/components/CategoryJoinButton"
import JoinAlcoholicButton from "@/components/JoinAlcoholicButton"
import { fetcher } from "@/functions/fetcher"
import { CupSoda } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import useSWR from "swr"

// 🧃 Type สำหรับข้อมูลเครื่องดื่ม
type Drink = {
  idDrink: string
  strDrink: string
  strDrinkThumb: string
}

const OrdinaryDrinks = () => {
  const { data, error } = useSWR<{ drinks: Drink[] }>(
    'https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Ordinary_Drink',
    fetcher
  )

  if (error) return <div>Failed to load</div>
  if (!data) return (
    <div className="animate-pulse uppercase">
      Loading ordinary drinks <span className="loading loading-dots loading-lg"></span>
    </div>
  )

  return (
    <>
      <div className="flex items-center justify-between mx-4 mt-4">
        <div className="flex gap-4">
          <CategoryJoinButton />
          <JoinAlcoholicButton />
        </div>
        <div>
          <Breadcrumbs />
        </div>
      </div>

      <fieldset className="fieldset w-full bg-base-200 border border-base-300 p-4 rounded-box mt-6">
        <legend className="fieldset-legend capitalize text-lg font-semibold mb-4">
          Ordinary Drinks
        </legend>

        <div className="grid gap-6 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7">
          {data.drinks.map((drink) => (
            <div key={drink.idDrink} className="card bg-base-100 shadow-sm">
              <div className="card-body">
                <h2 className="card-title">{drink.strDrink}</h2>
                <div className="card-actions justify-end-safe">
                  <Link
                    href={`/ordinarydrinks/${drink.idDrink}`}
                    className="btn btn-soft btn-primary capitalize"
                  >
                    view recipe <CupSoda />
                  </Link>
                </div>
              </div>
              <figure>
                <Image
                  src={drink.strDrinkThumb}
                  alt={drink.strDrink}
                  width={400}
                  height={400}
                  className="object-cover w-full h-auto rounded-b-box"
                />
              </figure>
            </div>
          ))}
        </div>
      </fieldset>
    </>
  )
}
export default OrdinaryDrinks
