import { useEffect } from "react";
import { useMap } from "react-leaflet";

import { useRecords } from "src/contexts/RecordsContext";
import { useSearch } from "src/contexts/SearchContext";

function SetSearchPositionView() {
  const { setMapPosition } = useRecords();
  const { selectedPosition } = useSearch();

  const map = useMap();

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
