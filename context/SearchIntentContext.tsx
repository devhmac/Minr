"use client";
import { createContext, useState } from "react";

type SearchIntent = {
  searchIntent: boolean;
  setSearchIntent: React.Dispatch<React.SetStateAction<boolean>>;
};

const defaultVal = {
  searchIntent: false,
  setSearchIntent: (searchIntent: boolean) => {},
};

export const searchIntentContext = createContext(defaultVal);

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
