import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";

import { useMap } from "react-leaflet";

import { useRecords } from "../../../contexts/RecordsContext";

function SetRecordsCenterView() {
  const { mapPosition, setMapPosition } = useRecords();

  const [searchParams] = useSearchParams();
  const getLat = searchParams.get("lat");
  const getLng = searchParams.get("lng");

  useEffect(
    function () {
      if (getLat && getLng) setMapPosition([getLat, getLng]);
    },
    [getLat, getLng]
  );

  const map = useMap();
  map.setView(mapPosition);
  return null;
}

export default SetRecordsCenterView;
