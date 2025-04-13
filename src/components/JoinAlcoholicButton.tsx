import { Beer, BeerOff } from "lucide-react";

const JoinAlcoholicButton = () => {
  return (
    <div>
      <div className="join">
        <button className="btn btn-soft btn-accent join-item capitalize">
          <Beer /> alcoholic
        </button>
        <button className="btn btn-soft join-item btn-info capitalize">
          <BeerOff /> no alcoholic
        </button>
      </div>
    </div>
  );
};
export default JoinAlcoholicButton;
