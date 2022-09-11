import React, { useState } from "react";
import "./Home.css";
import Card from "../../Components/UI/Card";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { Alert } from "react-bootstrap";
import Button from "../../Components/UI/Button";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function loginHandler() {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        let user = userCredential.user;
        user.admin = false;
      })
      .catch((error) => {
        setError(error.message);
      });
  }

  return (
    <div>
      <Card className="p-3">
        <span className="text">Login</span>
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
          <Button onClick={loginHandler} className="mt-3">
            Login
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

export default Login;
