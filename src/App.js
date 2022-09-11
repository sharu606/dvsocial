import React, { useState } from "react";
import "./App.css";
import Home from "./Pages/Home/Home";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "./firebase";
import Options from "./Pages/Options/Options";
import { doc, getDoc } from "firebase/firestore";

function App() {
  const [user, setUser] = useState(false);
  const [admin, setAdmin] = useState(false);

  onAuthStateChanged(auth, async (user) => {
    if (user) {
      setUser(true);
      await getDoc(doc(db, "Users", user.uid)).then((user) => {
        setAdmin(user.data().admin);
      });
    } else {
      setUser(false);
    }
  });

  return (
    <div className="App">
      {!user && <Home />}
      {user && <Options admin={admin} />}
    </div>
  );
}

export default App;
