import { useMap, useMapEvent } from "react-leaflet";

import { useRecords } from "../../../contexts/RecordsContext";

function SetClickPositionView() {
  const { clickMapPosition, setClickPosition, isInit, setIsInit } =
    useRecords();

  const map = useMap();

  useMapEvent({
    click: (e) => {
      setClickPosition([e.latlng.wrap().lat, e.latlng.wrap().lng]);
      setIsInit(true);
    },
  });

  if (isInit) map.setView(clickMapPosition);

  return null;
}

export default SetClickPositionView;
