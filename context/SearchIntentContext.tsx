"use client";
import { createContext, useState } from "react";

type SearchIntent = {
  searchIntent: boolean | null;
  setSearchIntent: React.Dispatch<React.SetStateAction<boolean>>;
};

export const searchIntentContext = createContext<SearchIntent | null>(null);

export const SearchIntentProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [searchIntent, setSearchIntent] = useState(false);

  return (
    <searchIntentContext.Provider value={{ searchIntent, setSearchIntent }}>
      {children}
    </searchIntentContext.Provider>
  );
};
