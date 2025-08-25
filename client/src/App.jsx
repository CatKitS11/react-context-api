import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

import HomePage from "./pages/HomePage.jsx";
import ViewProductPage from "./pages/ViewProductPage.jsx";

import UserContext from "./context/UserContext"; 


function App() {
  const userData = {
    username: "John",
    avatar: "https://placedog.net/100/100",
    level: "platinum",
  };

  return (
    <div className="App"> 
      <UserContext.Provider value={userData}>
        <Router>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/product/:id" element={<ViewProductPage />} />
          </Routes>
        </Router>
      </UserContext.Provider>
    </div>
  );



}

export default App;
