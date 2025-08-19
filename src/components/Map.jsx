import { useNavigate, useSearchParams } from "react-router-dom";
import styles from "./Map.module.css";
function Map() {
  const [searchParams, setSearchParams] = useSearchParams();
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");
  const navigate = useNavigate();
  return (
    <>
      <div className={styles.mapContainer} onClick={() => navigate("form")}>
        <p>Posotion</p>
        <p>lat:{lat}</p>
        <p>png:{lng}</p>
        <div>
          <button
          className={styles.btn}
            onClick={(e) => {
              e.preventDefault();
              setSearchParams({ lat: 25, lng: 59 });
            }}
          >
            Change Posotion
          </button>
        </div>
      </div>
    </>
  );
}

export default Map;
