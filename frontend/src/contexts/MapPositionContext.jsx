import { createContext, useContext, useState } from "react";

const MapPositionContext = createContext();

function MapPositionProvider({ children }) {
  const [mapPosition, setMapPosition] = useState([24, 121.5]);

  return (
    <MapPositionContext.Provider value={{ mapPosition, setMapPosition }}>
      {children}
    </MapPositionContext.Provider>
  );
}

function useMapPosition() {
  const context = useContext(MapPositionContext);

  if (context === undefined)
    throw new Error(
      "MapPositionContext is used outside the MapPositionProvider"
    );

  return context;
}

export { MapPositionProvider, useMapPosition };
