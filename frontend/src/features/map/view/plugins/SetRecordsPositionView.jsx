import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useMap } from "react-leaflet";

import { useRecords } from "src/contexts/RecordsContext";

function SetRecordsPositionView() {
  const { mapPosition, setMapPosition } = useRecords();
  const [searchParams] = useSearchParams();

  const getLat = searchParams.get("lat");
  const getLng = searchParams.get("lng");

  useEffect(
    function () {
      if (getLat && getLng) {
        setMapPosition([getLat, getLng]);
      }
    },

    [getLat, getLng]
  );

  const map = useMap();
  map.setView(mapPosition);

  return null;
}

export default SetRecordsPositionView;
