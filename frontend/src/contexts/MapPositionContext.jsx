import { createContext, useContext, useState } from "react";

const MapPositionContext = createContext();

function MapPositionProvider({ children }) {
  const [mapPosition, setMapPosition] = useState([23.9739374, 120.9820179]);

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
