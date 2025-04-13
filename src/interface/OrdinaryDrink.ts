export type OrdinaryDrink = {
  idDrink: string;
  strDrink: string;
  strCategory: string;
  strAlcoholic: string;
  strInstructions: string;
  strInstructionsES?: string;
  strInstructionsDE?: string;
  strInstructionsFR?: string;
  strInstructionsIT?: string;
  strDrinkThumb: string;
  [key: `strIngredient${number}`]: string | null;
  [key: `strMeasure${number}`]: string | null;
};