import styles from "./CountryList.module.css";
import Spinner from "./Spinner";
import Message from "./Message";
import CountryItem from "./CountryItem";
import { useCities } from "../contexts/Cities-ctx";
import Loading from "./Loading";

function CountryList() {
  const { cities, isLoading } = useCities()
  const countrys = cities
  console.log(countrys);
  
  if (!countrys.length)
    return (
  <Message message="Add your first city by clicking on a city on the map" />
);
    if (isLoading) return <Loading fullScreen label="Đang tải các nước..."/>;
  return (
    <ul className={styles.countryList}>
      {countrys.map((countrys) => (
        <CountryItem countrys={countrys} key={countrys.country} />
      ))}
    </ul>
  );
}

export default CountryList;
