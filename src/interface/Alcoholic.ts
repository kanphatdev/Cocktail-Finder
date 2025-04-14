export type AlcoholicDrink = {
    idDrink: string;
    strDrink: string;
    strDrinkThumb: string;
  };
  export type AlcoholicDetail = {
    idDrink: string;
    strDrink: string;
    strDrinkThumb: string;
    strInstructions: string;
    strInstructionsES?: string;
    strInstructionsDE?: string;
    strInstructionsFR?: string;
    strInstructionsIT?: string;
    strGlass: string;
    strCategory: string;
    strIBA?: string;
    strAlcoholic: string;
    strTags?: string;
    // เพิ่ม ingredients
    [key: `strIngredient${number}`]: string | null;
  };