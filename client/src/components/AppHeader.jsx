import { useContext } from "react";
import { userContext } from "../App";

function AppHeader() {

  let contextData = useContext(userContext)
  return (
    <div className="app-header-container">
      <h1 className="app-title">Products</h1>
      <h2>สวัสดีคุณ {contextData.username}</h2>
    </div>
  );
}

export default AppHeader;
