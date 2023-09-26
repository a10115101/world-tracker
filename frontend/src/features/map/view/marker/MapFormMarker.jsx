import { Marker, Popup } from "react-leaflet";

import { useMapPosition } from "src/contexts/MapPositionContext";
import { useRecordForm } from "src/contexts/RecordFormContext";
import { LeafIcon } from "src/utilities/icon";

function MapFormMarker() {
  const { mapPosition } = useMapPosition();
  const { isFormOpened } = useRecordForm();

  const redIcon = new LeafIcon({ iconUrl: "/red-pin.png" });

  return (
    <>
      {isFormOpened ? (
        <Marker position={mapPosition} icon={redIcon}>
          <Popup>
            <h3>Current position</h3>
          </Popup>
        </Marker>
      ) : null}
    </>
  );
}

export default MapFormMarker;
