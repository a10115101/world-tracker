import { useEffect } from "react";
import { useMap } from "react-leaflet";

import { useMapPosition } from "src/contexts/MapPositionContext";
import { useMapSearch } from "src/contexts/MapSearchContext";

function SetSearchPositionView() {
  const map = useMap();
  const { setMapPosition } = useMapPosition();
  const { selectedPosition } = useMapSearch();

  useEffect(() => {
    if (selectedPosition) {
      const lat = selectedPosition?.geometry?.lat;
      const lng = selectedPosition?.geometry?.lng;

      map.setView([lat, lng]);
      setMapPosition([lat, lng]);
    }
  }, [selectedPosition]);

  return null;
}

export default SetSearchPositionView;
