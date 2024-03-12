"use client";
import { createContext, useState } from "react";

type SearchIntent = {
  searchIntent: boolean | null;
  setSearchIntent: React.Dispatch<React.SetStateAction<null>>;
};

export const searchIntentContext = createContext<SearchIntent | null>(null);

export const SearchIntentProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [searchIntent, setSearchIntent] = useState(null);

  return (
    <searchIntentContext.Provider value={{ searchIntent, setSearchIntent }}>
      {children}
    </searchIntentContext.Provider>
  );
};
