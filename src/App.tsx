import React, { useState } from "react";
import "./App.css";
import Header from "./components/Header";
import UserProfile, { UserProfileProps } from "./components/UserProfile";
import Footer from "./components/Footer";

function App() {
  const [user, setUser] = useState<UserProfileProps["userData"] | null>(null);

  const loadUserData = async () => {
    fetch("https://fakestoreapi.com/users/1")
      .then((res) => res.json())
      .then((json) =>
        setUser({
          user_id: json.id,
          phone: json.phone,
          email: json.email,
          first_name: json.name.firstname,
          last_name: json.name.lastname,
        })
      );
  };

  return (
    <div className="App">
      <Header />
      <button data-testid='loadbutton' onClick={() => loadUserData()}>
        Завантажити сторінку користувача
      </button>
      <UserProfile userData={user} />
      <Footer />
    </div>
  );
}

export default App;
