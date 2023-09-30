import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useMap } from "react-leaflet";

import { useMapPosition } from "src/contexts/MapPositionContext";

function SetRecordsPositionView() {
  const map = useMap();
  const [searchParams] = useSearchParams();
  const { mapPosition, setMapPosition } = useMapPosition();

  const getLat = searchParams.get("lat");
  const getLng = searchParams.get("lng");

  useEffect(
    function () {
      if (getLat && getLng) setMapPosition([getLat, getLng]);
    },
    [getLat, getLng]
  );

  map.setView(mapPosition);

  return null;
}

export default SetRecordsPositionView;
