import { createContext, useContext, useState } from "react";

const SearchContext = createContext();

function SearchProvider({ children }) {
  const [selectedPosition, setSelectedPosition] = useState(null);
  const [isMapSearchMarkerVisible, setIsMapSearchMarkerVisible] =
    useState(false);

  return (
    <SearchContext.Provider
      value={{
        selectedPosition,
        setSelectedPosition,
        isMapSearchMarkerVisible,
        setIsMapSearchMarkerVisible,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
}

function useSearch() {
  const context = useContext(SearchContext);

  if (context === undefined)
    throw new Error("SearchContext was used outside the SearchProvider");

  return context;
}

export { SearchProvider, useSearch };
