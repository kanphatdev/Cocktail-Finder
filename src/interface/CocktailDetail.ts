export interface CocktailDetailItem {
    idDrink: string;
    strDrink: string;
    strDrinkThumb: string;
    strInstructions: string;
    strInstructionsES?: string;
    strInstructionsDE?: string;
    strInstructionsFR?: string;
    strInstructionsIT?: string;
    strCategory?: string;
    strIBA?: string;
    strTags?: string;
    strAlcoholic?: string;
    strGlass?: string;
    [key: string]: unknown; // เผื่อสำหรับ ingredient/dose แบบ dynamic
  }
  
  export interface CocktailDetailResponse {
    drinks: CocktailDetailItem[];
  }
  