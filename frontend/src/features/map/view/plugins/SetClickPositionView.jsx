import { useMap, useMapEvent } from "react-leaflet";

import { useMapPosition } from "src/contexts/MapPositionContext";
import { useRecordForm } from "src/contexts/RecordFormContext";

function SetClickPositionView() {
  const map = useMap();
  const { mapPosition, setMapPosition } = useMapPosition();
  const { isClicked, setIsClicked } = useRecordForm();

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
