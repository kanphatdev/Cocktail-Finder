"use client";
import { AlphabetDropdownProps } from "@/interface/AlphabetDropdown";
import { ArrowDownAZ } from "lucide-react";


export default function AlphabetDropdown({
  selectedLetter,
  setSelectedLetter,
}: AlphabetDropdownProps) {
  const alphabet = Array.from({ length: 26 }, (_, i) =>
    String.fromCharCode(65 + i)
  );

  return (
    <div className="dropdown dropdown-end">
      <label
        tabIndex={0}
        className="btn btn-outline capitalize flex items-center gap-2"
      >
        <ArrowDownAZ size={18} />
        sort by
      </label>
      <ul
        tabIndex={0}
        className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-40 max-h-60 overflow-y-auto"
      >
        {alphabet.map((letter) => (
          <li key={letter}>
            <button
              className={`w-full text-left ${
                selectedLetter === letter.toLowerCase()
                  ? "font-bold text-primary"
                  : ""
              }`}
              onClick={() => setSelectedLetter(letter.toLowerCase())}
            >
              {letter}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
