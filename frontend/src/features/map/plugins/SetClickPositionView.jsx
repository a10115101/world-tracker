import { useMap, useMapEvent } from "react-leaflet";

import { useRecords } from "../../../contexts/RecordsContext";

function SetClickPositionView() {
  const { isClicked, setIsClicked, mapPosition, setMapPosition } = useRecords();

  const map = useMap();

  useMapEvent({
    click: (e) => {
      setMapPosition([e.latlng.wrap().lat, e.latlng.wrap().lng]);
      setIsClicked(true);
    },
  });

  if (isClicked) map.setView(mapPosition);

  return null;
}

export default SetClickPositionView;
