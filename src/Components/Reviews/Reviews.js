import React, { useEffect, useState } from "react";
import { collection, onSnapshot, query, addDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { CgProfile } from "react-icons/cg";
import Button from "../../Components/UI/Button";
import { Alert } from "react-bootstrap";
import "./Reviews.css";

function Reviews() {
  const [reviews, setReviews] = useState([]);
  const [info, setInfo] = useState("");
  const [review, setReview] = useState("");
  const [alert, setAlert] = useState(false);

  async function post() {
    if (!info) {
      setAlert(true);
      return;
    }
    setAlert(false);
    await addDoc(collection(db, "Reviews"), {
      info: info,
      review: review,
    });
    setInfo("");
    setReview("");
  }

  useEffect(() => {
    const q = query(collection(db, "Reviews"));
    onSnapshot(q, (querySnapshot) => {
      setReviews(
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
      <h2 className="review-hdg mt-1 mb-1">Reviews</h2>
      <div className="reviews pt-3">
        <div className="review p-3">
          <h5 className="color">Give your feedback!</h5>
          <hr />
          <label className="color">Email (or) Phone number</label>
          <input
            type="text"
            placeholder="email/number"
            className="ml-2"
            value={info}
            onChange={(e) => setInfo(e.target.value)}
          ></input>
          {alert && (
            <Alert key="danger" variant="danger" className="p-2">
              Enter atleast email or phone number
            </Alert>
          )}
          <p className="color">Review</p>
          <textarea
            className="review-text"
            rows={4}
            placeholder="review"
            value={review}
            onChange={(e) => {
              setReview(e.target.value);
            }}
          ></textarea>
          <br />
          <Button onClick={post}>Post</Button>
        </div>
        {reviews.map((review) => (
          <div className="review p-3">
            <div>
              <CgProfile className="review-icon mr-2" />
              {review.info}
            </div>
            <hr />
            <div>{review.review}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Reviews;
