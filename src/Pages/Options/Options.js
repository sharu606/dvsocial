import React, { useState } from "react";
import "./Options.css";
import { auth } from "../../firebase";
import { signOut } from "firebase/auth";
import Button from "../../Components/UI/Button";
import { Nav } from "react-bootstrap";
import Card from "../../Components/UI/Card";
import Menu from "../../Components/Menu/Menu";
import Specials from "../../Components/Specials/Specials";
import Reviews from "../../Components/Reviews/Reviews";

function Options(props) {
  const [card, setCard] = useState("");

  function logoutHandler() {
    signOut(auth)
      .then(() => {})
      .catch((error) => {
        console.log(error.message);
      });
  }

  return (
    <div>
      <Nav className="justify-content-end p-2 nav">
        {card && (
          <Button
            className="logout mr-2"
            onClick={() => {
              setCard("");
            }}
          >
            Back
          </Button>
        )}
        <Button className="logout" onClick={logoutHandler}>
          Logout
        </Button>
      </Nav>
      {!card && (
        <div className="options-bdy">
          <Card className="container p-3">
            <Card
              className="options-card m p-5"
              onClick={() => {
                setCard("menu");
              }}
            >
              Menu
            </Card>
            <Card
              className="options-card s p-5"
              onClick={() => {
                setCard("specials");
              }}
            >
              Specials
            </Card>
            <Card
              className="options-card r p-5"
              onClick={() => {
                setCard("reviews");
              }}
            >
              Reviews
            </Card>
          </Card>
        </div>
      )}
      {card === "menu" && <Menu admin={props.admin} />}
      {card === "specials" && <Specials admin={props.admin} />}
      {card === "reviews" && <Reviews />}
    </div>
  );
}

export default Options;
