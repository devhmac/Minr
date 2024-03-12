import { createContext, useState } from "react";

const searchIntentContext = createContext<null | {}>(null);

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
