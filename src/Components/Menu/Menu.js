import React, { useState, useEffect } from "react";
import {
  collection,
  onSnapshot,
  query,
  addDoc,
  doc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import "./Menu.css";
import { Image, Modal } from "react-bootstrap";
import Button from "../UI/Button";
import { db, storage } from "../../firebase";
import { FaTrash } from "react-icons/fa";
import { AiOutlineStop } from "react-icons/ai";

function Menu(props) {
  const [foods, setFoods] = useState([]);
  const [show, setShow] = useState(false);
  const [file, setFile] = useState(null);
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  async function deleteDish(id) {
    await deleteDoc(doc(db, "Dishes", id));
  }

  async function grayoutDish(id, grayout) {
    updateDoc(doc(db, "Dishes", id), { grayout: !grayout });
  }

  function addDish() {
    if (file) {
      const storageRef = ref(storage, file.name);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        () => {},
        (err) => console.log(err),
        async () => {
          await getDownloadURL(uploadTask.snapshot.ref).then((url) => {
            addDoc(collection(db, "Dishes"), {
              name: name,
              description: desc,
              grayout: false,
              img: url,
            });
          });
        }
      );
      setShow(false);
    }
  }

  function handleChange(e) {
    setFile(e.target.files[0]);
  }

  useEffect(() => {
    const q = query(collection(db, "Dishes"));
    onSnapshot(q, (querySnapshot) => {
      setFoods(
        querySnapshot.docs.map((doc) => {
          let data = doc.data();
          data.id = doc.id;
          return data;
        })
      );
    });
  }, []);

  return (
    <div>
      <h2 className="food-hdg">Dishes</h2>
      <div className="foods p-3">
        {foods.map((food) => (
          <div className="food-card p-3">
            {props.admin && (
              <FaTrash
                className="delete-icon p-1"
                onClick={() => deleteDish(food.id)}
              />
            )}
            {props.admin && (
              <AiOutlineStop
                className="stop-icon p-1"
                onClick={() => grayoutDish(food.id, food.grayout)}
              />
            )}
            <div className="food-name">{food.name}</div>
            <Image
              src={food.img}
              alt="Illustration"
              className="food-img"
              style={{
                opacity: food.grayout ? "0.4" : "1",
                filter: food.grayout ? "alpha((opacity = 40))" : "none",
              }}
            ></Image>
            <div className="food-desc">{food.description}</div>
            <Button className="food-btn mt-2">Add to Cart</Button>
          </div>
        ))}
        {props.admin && <button className="add-dish" onClick={handleShow}>
          Add new dish
        </button>}
        <Modal
          show={show}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>New Dish</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <label>Name</label>
            <input
              type="text"
              maxLength={30}
              className="ml-2"
              onChange={(e) => {
                setName(e.target.value);
              }}
            ></input>
            <br />
            <label>Description</label>
            <input
              maxLength={80}
              type="text"
              className="ml-2"
              onChange={(e) => {
                setDesc(e.target.value);
              }}
            ></input>
            <input type="file" accept="image/*" onChange={handleChange}></input>
          </Modal.Body>
          <Modal.Footer>
            <Button className="food-btn" onClick={addDish}>
              Add
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
}

export default Menu;
