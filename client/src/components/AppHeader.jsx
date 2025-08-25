import { useContext } from "react";
import UserContext from "../context/UserContext";

function AppHeader() {
  const user = useContext(UserContext); // ดึงข้อมูลจาก Context จาก Provider

  return (
    <div className="app-header-container">
      <h1 className="app-title">Products</h1>
      <h2>สวัสดีคุณ {user.username}</h2>
    </div>
  );
}

export default AppHeader;
