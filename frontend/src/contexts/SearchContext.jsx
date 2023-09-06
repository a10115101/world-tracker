import { createContext, useContext, useRef, useState } from "react";

const SearchContext = createContext();

function SearchProvider({ children }) {
  const [selectedPosition, setSelectedPosition] = useState(null);
  // const isListOpened = useRef(false);
  const [isListOpened, setIsListOpened] = useState(false);
  const [isMapSearchMarkerVisible, setIsMapSearchMarkerVisible] =
    useState(false);

  return (
    <SearchContext.Provider
      value={{
        selectedPosition,
        setSelectedPosition,
        isListOpened,
        setIsListOpened,
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
