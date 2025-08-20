//import AppNav from "../components/AppNav"

// import { Outlet } from "react-router-dom"
//import AppNav from "../components/AppNav"
import { Outlet } from "react-router-dom";
import Map from "../components/Map";
import SideBar from "../components/SideBar";
import styles from "./AppLayout.module.css";

function AppLayout() {
  return (
    <div className={styles.app}>
      <div className={styles.left}>
        <SideBar />
      </div>
      <div className={styles.right}>
        <Map />
      </div>
    </div>
  );
}

export default AppLayout;
