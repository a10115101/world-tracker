import { useMapEvent } from "react-leaflet";

import { useRecords } from "../../../contexts/RecordsContext";

function DetectClick() {
  const { setMapPosition } = useRecords();

  useMapEvent({
    click: (e) => setMapPosition([e.latlng.wrap().lat, e.latlng.wrap().lng]),
  });
}

export default DetectClick;
