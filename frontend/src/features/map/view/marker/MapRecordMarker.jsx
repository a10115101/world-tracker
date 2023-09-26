import { Marker, Popup } from "react-leaflet";

import { useRecords } from "src/contexts/RecordsContext";
import { LeafIcon } from "src/utilities/icon";
import style from "./marker.module.css";

function MapRecordMarker() {
  const { records } = useRecords();

  const greenIcon = new LeafIcon({ iconUrl: "/green-pin.png" });
  const yellowIcon = new LeafIcon({ iconUrl: "/yellow-pin.png" });

  return (
    <>
      {records.map((record) => (
        <Marker
          position={[
            record.position.coordinates[1],
            record.position.coordinates[0],
          ]}
          icon={record.status === "visited" ? greenIcon : yellowIcon}
          key={record._id}
        >
          <Popup>
            <div className={style.container}>
              <div>
                <h3>Status:</h3>
                <p>{record.status}</p>
              </div>
              <div>
                <h3>Place:</h3>
                <p>
                  {record.country} ({record.cityName})
                </p>
              </div>
            </div>
          </Popup>
        </Marker>
      ))}
    </>
  );
}

export default MapRecordMarker;
