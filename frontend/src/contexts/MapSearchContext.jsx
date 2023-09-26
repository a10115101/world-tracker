import { createContext, useContext, useState } from "react";

const MapSearchContext = createContext();

function MapSearchProvider({ children }) {
  const [selectedPosition, setSelectedPosition] = useState(null);
  const [isMapSearchMarkerVisible, setIsMapSearchMarkerVisible] =
    useState(false);

  return (
    <MapSearchContext.Provider
      value={{
        selectedPosition,
        setSelectedPosition,
        isMapSearchMarkerVisible,
        setIsMapSearchMarkerVisible,
      }}
    >
      {children}
    </MapSearchContext.Provider>
  );
}

function useMapSearch() {
  const context = useContext(MapSearchContext);

  if (context === undefined)
    throw new Error("MapSearchContext is used outside the MapSearchProvider");

  return context;
}

export { MapSearchProvider, useMapSearch };
