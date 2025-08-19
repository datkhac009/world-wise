import CityItem from "./CityItem";
import styles from "./CityList.module.css";
import Message from './Message';
import Loading from "./Loading";
import { useCities } from "../contexts/Cities-ctx";
function ListCity() {
  const {cities , isLoading ,setCities} = useCities()
  console.log("data:",cities)
  console.log("status",isLoading)
  if(isLoading) return <Loading fullScreen label="Đang tải thành phố..."/>
  if(!Array.isArray(cities) || cities.length === 0){
   return (<Message message="Add your first city by clicking on a cities"/>)
  }  
  
  return (
    <>
   
    <div className={styles.scroll}>

      <ul className={styles.cityList}>
        {cities.map((city)=> <CityItem key={city.id} city = {city} setCities= {setCities}/>)}
      </ul>
    </div>
     
    </>
  );
}

export default ListCity;
