import { Marker, Popup } from "react-leaflet";
import { useRecords } from "../../contexts/RecordsContext";

function MapFormMarker() {
  const { clickMapPosition } = useRecords();

  return (
    <Marker position={clickMapPosition}>
      <Popup>
        A pretty CSS3 popup. <br /> Easily customizable.
      </Popup>
    </Marker>
  );
}

export default MapFormMarker;
