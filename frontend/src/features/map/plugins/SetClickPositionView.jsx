import { useMap, useMapEvent } from "react-leaflet";

import { useRecords } from "../../../contexts/RecordsContext";

function SetClickPositionView() {
  const { clickMapPosition, setClickPosition, isClicked, setIsClicked } =
    useRecords();

  const map = useMap();

  useMapEvent({
    click: (e) => {
      setClickPosition([e.latlng.wrap().lat, e.latlng.wrap().lng]);
      setIsClicked(true);
    },
  });

  if (isClicked) map.setView(clickMapPosition);

  return null;
}

export default SetClickPositionView;
