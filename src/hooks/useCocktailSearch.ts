"use client";
import { useCallback, useEffect } from "react";

export function useCocktailSearch(
  cocktail: string,
  setQuery: (query: string) => void,
  inputRef: React.RefObject<HTMLInputElement>
) {
  // Submit handler
  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setQuery(cocktail.trim());
    },
    [cocktail, setQuery]
  );

  // Keyboard focus shortcut
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === "c") {
        inputRef.current?.focus();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [inputRef]);

  return { handleSubmit };
}
