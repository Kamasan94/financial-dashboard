import React, { useState } from "react";
import Register from "./components/Register";
import Login from "./components/Login";
import './App.css';



function App() {
  const [loggedInUser, setLoggedInUser] = useState(null);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setLoggedInUser(null);
  };


  return (
    <div className="App">
      {loggedInUser ? (
        <div>
          <p>Welome back {loggedInUser}</p>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <div>
          <Register/>
          <Login setLoggedInUser={setLoggedInUser}/>
        </div>
      )}
    </div>
  );
}

export default App;
