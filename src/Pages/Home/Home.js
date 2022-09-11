import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import { Row, Col, Image } from "react-bootstrap";
import { useState } from "react";
import "./Home.css";
import home from "../../Assets/home.png";
import Login from "./Login";
import Signup from "./Signup";
import Button from "../../Components/UI/Button";

function Home() {
  const [left, setLeft] = useState(true);
  function leftLogin(e) {
    setLeft(true);
  }

  function rightLogin(e) {
    setLeft(false);
  }

  return (
    <div className="home">
      <Row className="m-0 p-0">
        <Col className="left">
          <Image src={home} alt="animation image" className="home-img"></Image>
          <Button className="m-2" onClick={leftLogin}>
            Login
          </Button>
          <Button className="m-2 home-btn" onClick={rightLogin}>
            Sign up
          </Button>
        </Col>
        <Col className="right">
          {left && <Login />}
          {!left && <Signup />}
        </Col>
      </Row>
    </div>
  );
}

export default Home;
