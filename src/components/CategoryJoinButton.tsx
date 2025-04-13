" use clent";

import { CupSoda, Wine } from "lucide-react";
import Link from "next/link";

const CategoryJoinButton = () => {
  return (
    <div className="join">
      <Link href={"/ordinarydrinks"} className="btn btn-soft btn-primary join-item capitalize">
        <CupSoda />
        ordinary drinks
      </Link>
      <Link
        href={"/cocktail"}
        className="btn btn-soft join-item capitalize btn-secondary"
      >
        <Wine />
        cocktail
      </Link>
    </div>
  );
};
export default CategoryJoinButton;
