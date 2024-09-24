import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import axios from "axios";

function App() {
  const [count, setCount] = useState(0);
  const [array, setArray] = useState([]);

  const fetchApi = async () => {
    const response = await axios.get("http://localhost:8080/api/users");
    setArray(response.data.users);
  };

  useEffect(() => {
    fetchApi();
  }, []);

  return (
    <>
      <div className="header text-center p-3 bg-primary text-white">
        House Price Prediction System
      </div>
    </>
  );
}

export default App;
