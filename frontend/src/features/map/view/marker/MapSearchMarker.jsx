import { Marker, Popup } from "react-leaflet";

import { useMapSearch } from "src/contexts/MapSearchContext";
import { LeafIcon } from "src/utilities/icon";
import style from "./marker.module.css";

function MapSearchMarker() {
  const { selectedPosition } = useMapSearch();

  const annotations = selectedPosition?.annotations;
  const locationSelection = [
    Number(selectedPosition?.geometry?.lat),
    Number(selectedPosition?.geometry?.lng),
  ];

  const redIcon = new LeafIcon({ iconUrl: "/red-pin.png" });

  return (
    <>
      {selectedPosition ? (
        <Marker position={locationSelection} icon={redIcon}>
          <Popup autoClose={true} minWidth={400}>
            <div className={style.container}>
              <div>
                <h3>Position:</h3>
                <p>{selectedPosition.formatted}</p>
              </div>
              <div>
                <h3> Currency:</h3>
                <p>
                  {annotations.currency.name} ({annotations.currency.symbol})
                </p>
              </div>
              <div>
                <h3>Road Info:</h3>
                <p>
                  Drive On ({annotations.roadinfo.drive_on}) / Speed (
                  {annotations.roadinfo.speed_in})
                </p>
              </div>
              <div>
                <h3>Timezone:</h3>
                <p>UTC {annotations.timezone.offset_string}</p>
              </div>
            </div>
          </Popup>
        </Marker>
      ) : null}
    </>
  );
}

export default MapSearchMarker;
