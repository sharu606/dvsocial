import React, { useState, useEffect } from "react";
import { collection, onSnapshot, query, doc, setDoc } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import "./Specials.css";
import { Image } from "react-bootstrap";
import { db, storage } from "../../firebase";
import { MdEdit } from "react-icons/md";
import Button from "../../Components/UI/Button";

function Specials(props) {
  const [foods, setFoods] = useState([]);
  const [edit, setEdit] = useState("");
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState("");

  async function editDish(food) {
    if (edit == food.id) {
      setEdit("");
    } else {
      setEdit(food.id);
    }
    setName(food.name);
    setDesc(food.description);
    setFile("");
  }

  async function save(id, ur) {
    if (file) {
      const storageRef = ref(storage, file.name);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        () => {},
        (err) => console.log(err),
        async () => {
          await getDownloadURL(uploadTask.snapshot.ref).then((url) => {
            setDoc(doc(db, "Specials", id), {
              name: name,
              description: desc,
              img: url,
            });
          });
        }
      );
    } else {
      setDoc(doc(db, "Specials", id), {
        name: name,
        description: desc,
        img: ur
      });
    }
    setEdit("");
  }

  function handleChange(e) {
    setFile(e.target.files[0]);
  }

  useEffect(() => {
    const q = query(collection(db, "Specials"));
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
      <h2 className="food-hdg">Specials</h2>
      <div className="foods p-3">
        {foods.map((food) => (
          <div className="special-card p-3">
            {props.admin && (
              <MdEdit
                className="delete-icon p-1"
                onClick={() => editDish(food)}
              />
            )}
            {edit != food.id && <div className="food-name">{food.name}</div>}
            {edit == food.id && (
              <input
                type="text"
                placeholder="name"
                defaultValue={food.name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
              ></input>
            )}
            {edit != food.id && (
              <Image
                src={food.img}
                alt="Illustration"
                className="special-img mt-2 mb-2"
              ></Image>
            )}
            {edit == food.id && (
              <input
                type="file"
                accept="image/*"
                className="m-3"
                onChange={handleChange}
              ></input>
            )}
            {edit != food.id && (
              <div className="special-desc mt-1">{food.description}</div>
            )}
            {edit == food.id && (
              <textarea
                placeholder="description"
                defaultValue={food.description}
                className="sp-field"
                rows={5}
                onChange={(e) => {
                  setDesc(e.target.value);
                }}
              ></textarea>
            )}
            {edit == food.id && (
              <Button className="mt-3" onClick={() => save(food.id, food.img)}>
                Save
              </Button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Specials;
