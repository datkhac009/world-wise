// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"
import "react-datepicker/dist/react-datepicker.css";

import { useEffect, useState } from "react";

import styles from "./Form.module.css";
import Button from "./Button";
import { useNavigate } from "react-router-dom";
import { useCities } from "../contexts/Cities-ctx";
import { usePosition } from "../hook/usePosition";
import Message from "./Message";
import Loading from "./Loading";
import DatePicker from "react-datepicker";

// export function convertToEmoji(countryCode) {
//   const codePoints = countryCode
//     .toUpperCase()
//     .split("")
//     .map((char) => 127397 + char.charCodeAt());
//   return String.fromCodePoint(...codePoints);
// }
const BASE_URL = "https://api.bigdatacloud.net/data/reverse-geocode-client";
function Form() {
  const { formatDate } = useCities();
  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [emoji, setEmoji] = useState("");
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");
  const navigate = useNavigate();
  const [isLoadingCityForm, setIsLoadingCityForm] = useState(false);
  const { lat, lng } = usePosition();
  const { flagUrl } = useCities();
  const { addCity } = useCities();
  console.log(isLoadingCityForm);
  useEffect(() => {
    async function fetCityData() {
      try {
        setIsLoadingCityForm(true);
        const res = await fetch(`${BASE_URL}?latitude=${lat}&longitude=${lng}`);
        const data = await res.json();
        if (!data.countryCode)
          return <Message message="That doen't seem to be a city" />;

        setCityName(data.city || data.locality || "");
        setCountry(data.countryName || "");
        setEmoji(data.countryCode);
        console.log(data);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoadingCityForm(false);
      }
    }
    fetCityData();
    fetCityData();
  }, [lat, lng]);

  if (!lat && !lng) return <Message message="clicking somewhere on the map" />;
  if (isLoadingCityForm) return <Loading fullScreen label="Loading..." />;
  function hanldSubmit(e) {
    e.preventDefault();
    const newCity = {
      cityName,
      country,
      date,
      emoji,
      notes,
      position: {
        lat,
        lng,
      },
    };
    addCity(newCity);
    navigate("/app/cities")
  }
  return (
    <form className={styles.form} onSubmit={hanldSubmit}>
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={country}
        />
        <span className={styles.flag}>
          <img src={flagUrl(emoji)} alt={emoji} width="25px" height="20px" />
        </span>
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {country}?</label>

        <DatePicker
          selected={date}
          onChange={(date) => setDate(date)}
          value={formatDate(date)}
          isClearable={true}
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">
          Notes about your trip to {country} from {cityName}
        </label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button type="primary">Add</Button>
        <Button
          type="back"
          onClick={(e) => {
            e.preventDefault();
            navigate("/app/form");
          }}
        >
          &larr; Back
        </Button>
      </div>
    </form>
  );
}

export default Form;
