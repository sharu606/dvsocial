import React, { useState } from "react";
import "./Home.css";
import Card from "../../Components/UI/Card";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../firebase";
import { Alert } from "react-bootstrap";
import Button from "../../Components/UI/Button";
import { setDoc, doc } from "firebase/firestore";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [admin, setAdmin] = useState(false);
  const [error, setError] = useState("");

  async function signupHandler() {
    createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        let uid = userCredential.user.uid;
        await setDoc(doc(db, "Users", uid), {
          admin: admin,
        });
      })
      .catch((error) => {
        setError(error.message);
      });
  }

  return (
    <div>
      <Card className="p-3">
        <span className="text">Sign up</span>
        <Card>
          <input
            className="ip-field m-2 mt-4"
            type="email"
            placeholder="email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          ></input>
          <input
            className="ip-field m-2 mt-2"
            type="password"
            placeholder="password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          ></input>
          <div className="ip-checkbox ml-3">
            <input
              type="checkbox"
              id="admin"
              value="admin"
              name="admin"
              onChange={(e) => {
                setAdmin(e.target.checked);
              }}
            ></input>
            <label for="admin" className="ml-2">
              Admin
            </label>
          </div>
          <Button onClick={signupHandler} className="mt-3">
            Sign up
          </Button>
        </Card>
      </Card>
      {error && (
        <Alert key="danger" variant="danger" className="p-2 error">
          {error}
        </Alert>
      )}
    </div>
  );
}

export default Signup;
