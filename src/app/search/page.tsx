import SearchCocktail from "@/components/SearchCocktail";
import SearchIngredient from "@/components/SearchIngredient";

const Search = () => {
  return (
    <div className="flex gap-4 justify-center items-center">
     <SearchCocktail />
      <SearchIngredient />
    
    </div>
  );
};
export default Search;
