import { Link } from "react-router-dom";
import styles from "./CityItem.module.css";
import { useCities } from "../contexts/Cities-ctx";
const formatDate = (isString) => {
  if (!isString) return "";
  return new Intl.DateTimeFormat("vi-VN", {
    weekday: "short",
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(isString));
};

function CityItem({ city, setCities }) {
  const { flagUrl, currentCity } = useCities();

  console.log(city);
  const { cityName, emoji, date, id, position } = city;
  console.log(String(id) === String(currentCity?.id));
  function handleDelete(id) {
    setCities((prevs) => prevs.filter((prev) => prev.id !== id));
  }

  return (
    <div>
      <li
        className={`${styles.cityItem} ${
          id === currentCity?.id ? styles["cityItem--active"] : ""
        }`}
      >
        <Link
          to={`/app/cities/${id}?lat=${position.lat}&lng=${position.lng}`}
          className={styles.itemLink}
        >
          <span className={styles.flag}>
            <img src={flagUrl(emoji)} alt={emoji} width="24" height="18" />
          </span>
          <span className={styles.name}>{cityName}</span>
          <span className={styles.date}>({formatDate(date)})</span>
        </Link>

        <button
          type="button"
          className={styles.deleteBtn}
          onClick={(e) => {
            e.stopPropagation();
            handleDelete(id);
          }}
        >
          ×
        </button>
      </li>
    </div>
  );
}

export default CityItem;
