import { Link } from "react-router-dom";
import styles from "./CityItem.module.css";
const formatDate = (isString) => {
  if (!isString) return "";
  return new Intl.DateTimeFormat("vi-VN", {
    weekday: "short",
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(isString));
};
const flagUrl = (input = {}) => {
  const s = String(input || "");
  // emoji của API đang là chữ hoa về viết thường
  // đổi về country code 2 ký tự, viết thường
  const code = /^[A-Za-z]{2,3}$/.test(s) //{2,3} là phạm vi 2 hoăc 3 ký tự VD:"VN","USA"
    ? s.toLowerCase()
    : String.fromCharCode(
        ...[...s].slice(0, 2).map((ch) => (ch.codePointAt(0) ?? 0) - 127397)
      ).toLowerCase();

  if (code) return `https://flagcdn.com/${code}.svg`; // ✅ luôn tồn tại
};
function CityItem({ city, setCities }) {
  console.log(city);
  const { cityName, emoji, date, id ,position} = city;
console.log(position)
  function handleDelete(id) {
    setCities((prevs) => prevs.filter((prev) => prev.id !== id));
  }
  return (
    <div>
      <li className={styles.cityItem}>
        <Link to={`/app/cities/${id}?lat=${position.lat}&lng=${position.lng}`} className={styles.itemLink}>
          <span className={styles.flag}>
            <img src={flagUrl(emoji)} alt="" width="24" height="18" />
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
