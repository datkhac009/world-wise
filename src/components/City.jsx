import {  useNavigate, useParams } from "react-router-dom";
import styles from "./City.module.css";
import { useCities } from "../contexts/Cities-ctx";
import { useEffect } from "react";
import Loading from "./Loading";
import Button from "./Button";

const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
    weekday: "long",
  }).format(new Date(date));

function City() {
  // const currentCity = {
  //   cityName: "Lisbon",
  //   emoji: "🇵🇹",
  //   date: "2027-10-31T15:59:59.138Z",
  //   notes: "My favorite city so far!",
  // };
  // const [searchParams] = useSearchParams();
  // const lat = searchParams.get("lat");
  // const lng = searchParams.get("lng");
  const { id } = useParams();
  const navigate = useNavigate()
  const { getCity, currentCity, isLoading, flagUrl } = useCities();
  
  useEffect(() => {
    if (!id) return;
    getCity(id);
  }, [id,getCity]);
  if (isLoading) return <Loading fullScreen label="Loading..." />;
  const { cityName, emoji, notes, date } = currentCity ?? {};
  return (
    <>

      <div className={styles.city}>
        <div className={styles.row}>
          <h6>City name</h6>
          <h3>
            <span>
              <img src={flagUrl(emoji)} alt={emoji} width="24" height="18" />
            </span>{" "}
            {cityName}
          </h3>
        </div>

        <div className={styles.row}>
          <h6>You went to {cityName} on</h6>
          <p>{formatDate(date || null)}</p>
        </div>

        {notes && (
          <div className={styles.row}>
            <h6>Your notes</h6>
            <p>{notes}</p>
          </div>
        )}

        <div className={styles.row}>
          <h6>Learn more</h6>
          <a
            href={`https://en.wikipedia.org/wiki/${cityName}`}
            target="_blank"
            rel="noreferrer"
          >
            Check out {cityName} on Wikipedia &rarr;
          </a>
        </div>
        <div>
          <Button type={"back"} onClick={() => navigate("/app/cities")}>&larr; Back</Button>
        </div>

      </div>
    </>
  );
}

export default City;
