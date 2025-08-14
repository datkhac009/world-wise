import styles from "./CountryList.module.css";
import Spinner from "./Spinner";
import Message from "./Message";
import CountryItem from "./CountryItem";

function CountryList({ countrys, isLoading }) {
  console.log(countrys);
  if (isLoading) return <Spinner />;

  if (!countrys.length)
    return (
      <Message message="Add your first city by clicking on a city on the map" />
    );
  //Còn cách khác là : lấy danh sách các quốc gia (country) duy nhất từ mảng cities, đồng thời lưu kèm emoji của quốc gia đó.
  //     const country = cities.reduce((arr, city) => {
  //   const existed = arr.map(el => el.country);
  //   if (!existed.includes(city.country)) {
  //     return [...arr, { country: city.country, emoji: city.emoji }];
  //   }
  //   return arr;
  // }, []);
  return (
    <ul className={styles.countryList}>
      {countrys.map((countrys) => (
        <CountryItem countrys={countrys} key={countrys.country} />
      ))}
    </ul>
  );
}

export default CountryList;
