import { Beer, BeerOff } from "lucide-react";
import Link from "next/link";

const JoinAlcoholicButton = () => {
  return (
    <div>
      <div className="join">
        <Link href={"/alcoholic"} className="btn btn-soft btn-accent join-item capitalize">
          <Beer /> alcoholic
        </Link>
        <Link href={"/nonalcoholic"} className="btn btn-soft join-item btn-info capitalize">
          <BeerOff /> no alcoholic
        </Link>
      </div>
    </div>
  );
};
export default JoinAlcoholicButton;
