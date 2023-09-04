import { useEffect } from "react";
import { useMap } from "react-leaflet";

import { useSearch } from "../../../contexts/SearchContext";

function SetSearchCenterView() {
  const { selectedPosition } = useSearch();
  const map = useMap();

  useEffect(() => {
    if (selectedPosition) {
      map.setView([
        selectedPosition?.geometry?.lat,
        selectedPosition?.geometry?.lng,
      ]);
    }
  }, [selectedPosition]);

  return null;
}

export default SetSearchCenterView;
