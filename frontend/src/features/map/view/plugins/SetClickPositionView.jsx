import { useMap, useMapEvent } from "react-leaflet";

import { useMapPosition } from "src/contexts/MapPositionContext";
import { useRecordForm } from "src/contexts/RecordFormContext";

function SetClickPositionView() {
  const map = useMap();
  const { mapPosition, setMapPosition } = useMapPosition();
  const { isFormOpened } = useRecordForm();

  useMapEvent({
    click: (e) => {
      if (isFormOpened) {
        setMapPosition([e.latlng.wrap().lat, e.latlng.wrap().lng]);
        map.setView(mapPosition);
      }
    },
  });

  return null;
}

export default SetClickPositionView;
