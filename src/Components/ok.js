import React from "react";
import { useState, useEffect } from "react";
import { collection, onSnapshot, query } from "firebase/firestore";
import { db } from "../firebase";

function Ok() {
  const [val, setVal] = useState("ok");

  useEffect(() => {
    const q = query(collection(db, 'ok'))
    onSnapshot(q, (querySnapshot) => {
      setVal(querySnapshot.docs.map(doc => (
        doc.data().name
      )))
    })
  }, []);

  return (
    <div>
      <h1>{val}</h1>
    </div>
  );
}

export default Ok;
