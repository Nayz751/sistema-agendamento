import "./layout.css";
import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";

function Layout({ currentScreen, setCurrentScreen }) {
  return (
    <div className="app-container">
      <Sidebar 
        currentScreen={currentScreen}
        setCurrentScreen={setCurrentScreen}
      />

      <div className="app-content">
        <Outlet />
      </div>
    </div>
  );
}

export default Layout;