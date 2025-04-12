" use clent";

import { CupSoda, Wine } from "lucide-react";
import Link from "next/link";

const JoinButton = () => {
  return (
    <div className="join">
      <Link href={""} className="btn btn-soft btn-primary join-item capitalize">
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
export default JoinButton;
