import { useNavigate, useSearchParams } from "react-router-dom";
import styles from "./Map.module.css";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  useMapEvents,
  Circle,
} from "react-leaflet";
import "leaflet/dist/leaflet.css"; // bắt buộc
import { useCities } from "../contexts/Cities-ctx";
import { useEffect, useState } from "react";
import { useGeolocation } from "../hook/useGeolocation";
import Button from "./Button";

function Map() {
  const { cities, flagUrl } = useCities();
  const {
    isLoading: isLoadingPosition,
    position: geolocationPosition,
    getPosition,
  } = useGeolocation();
  const [mapPosition, setMapPosition] = useState([21, 614]);
  const [searchParams] = useSearchParams();
  const Maplat = searchParams.get("lat");
  const Maplng = searchParams.get("lng");

  useEffect(() => {
    if (Maplat && Maplng) setMapPosition([Maplat, Maplng]);
  }, [Maplat, Maplng]);

  useEffect(() => {
    if (geolocationPosition) {
      setMapPosition([geolocationPosition.lat, geolocationPosition.lng]);
    }
  }, [geolocationPosition]);
  console.log(geolocationPosition)
  return (
    <div className={styles.mapContainer}>
      {!geolocationPosition && (
        <Button type="position" onClick={getPosition}>
          {isLoadingPosition ? "Loading.." : "Your are position"}
        </Button>
      )}
      //map của lib react leaflet
      <MapContainer center={mapPosition} zoom={7} scrollWheelZoom={true}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {cities.map((city) => {
          return (
            <Marker
              key={city.id}
              position={[Number(city.position.lat), Number(city.position.lng)]}
            >
              <Popup>
                {/* Click vào sẽ hiện ra thành phố */}
                <span>
                  <img
                    src={flagUrl(city.emoji)}
                    alt="emojiCity"
                    style={{
                      width: 30,
                      height: 24,
                      verticalAlign: "middle",
                      marginRight: "1rem",
                    }}
                  />
                  {city.cityName}
                </span>
              </Popup>
              <Circle
                center={mapPosition}
                radius={100}
                pathOptions={{
                  color: "#3b82f6",
                  fillColor: "#3b82f6",
                  fillOpacity: 0.1,
                }}
              />
            </Marker>
          );
        })}

        <DetectClick />
        <ChangePosition position={mapPosition} />
      </MapContainer>
    </div>
  );
}
function ChangePosition({ position }) {
  const map = useMap();
  map.setView(position);
  return null;
}
function DetectClick() {
  const navigate = useNavigate();

  useMapEvents({
    //khi click thì sẽ hiện lat và lng trên url lúc click ở map
    click: (e) => navigate(`form?lat=${e.latlng.lat}&=${e.latlng.lng}`),
  });
}
export default Map;
