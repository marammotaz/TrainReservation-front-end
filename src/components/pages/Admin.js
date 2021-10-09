import React from "react";
import { useHistory } from "react-router-dom";
import { useState } from "react";
import "../styles/login.css";
import { Card } from "react-bootstrap";
import axios from "axios";

function Admin() {
  const history = useHistory();
  // use state hooks
  const [invalidTrainNo, setInvalidTrainNo] = useState(false);
  const [invalidTripNo, setInvalidTripNo] = useState(false);
  const [invalidType, setInvalidType] = useState(false);
  const [invalidPrice, setInvalidPrice] = useState(false);
  const [invalidFrom, setInvalidFrom] = useState(false);
  const [invalidTo, setInvalidTo] = useState(false);
  const [invalidTime, setInvalidTime] = useState(false);

  // return to login page
  const signOut = (e) => {
    e.preventDefault();
    localStorage.setItem("isAuthenticated", "null");
    history.push("/");
  };

  const submit = (e) => {
    e.preventDefault();

    let request = {
      TrainNo: document.getElementById("trainNo").value,
      TripNo: document.getElementById("tripNo").value,
      TrainType: document.getElementById("trainType").value,
      TicketPrice: document.getElementById("price").value,
      From: document.getElementById("from").value,
      To: document.getElementById("to").value,
      Time: document.getElementById("time").value,
    };
    axios
      .post(`${process.env.REACT_APP_BACKENDURL}/admin`, request)
      .then((resp) => {
        // to make sure all data is filled
        if (resp.data.message === "Enter trip number") {
          setInvalidTrainNo(false);
          setInvalidTripNo(true);
          setInvalidType(false);
          setInvalidPrice(false);
          setInvalidFrom(false);
          setInvalidTo(false);
          setInvalidTime(false);
        } else if (resp.data.message === "Enter train number") {
          setInvalidTrainNo(true);
          setInvalidTripNo(false);
          setInvalidType(false);
          setInvalidPrice(false);
          setInvalidFrom(false);
          setInvalidTo(false);
          setInvalidTime(false);
        } else if (resp.data.message === "Enter train type") {
          setInvalidTrainNo(false);
          setInvalidTripNo(false);
          setInvalidType(true);
          setInvalidPrice(false);
          setInvalidFrom(false);
          setInvalidTo(false);
          setInvalidTime(false);
        } else if (resp.data.message === "Enter price") {
          setInvalidTrainNo(false);
          setInvalidTripNo(false);
          setInvalidType(false);
          setInvalidPrice(true);
          setInvalidFrom(false);
          setInvalidTo(false);
          setInvalidTime(false);
        } else if (resp.data.message === "Enter from where") {
          setInvalidTrainNo(false);
          setInvalidTripNo(false);
          setInvalidType(false);
          setInvalidFrom(true);
          setInvalidTo(false);
          setInvalidTime(false);
        } else if (resp.data.message === "Enter destination") {
          setInvalidTrainNo(false);
          setInvalidTripNo(false);
          setInvalidType(false);
          setInvalidFrom(false);
          setInvalidTo(true);
          setInvalidTime(false);
        } else if (resp.data.message === "Enter time") {
          setInvalidTrainNo(false);
          setInvalidTripNo(false);
          setInvalidType(false);
          setInvalidFrom(true);
          setInvalidTo(false);
          setInvalidTime(true);
        } else if (resp.data.message === "Successful") {
          const elem = document.createElement("p");
          elem.innerHTML = `<p style="color:red; margin-top:20px">Your trip has ben successfully added</p>`;
          document.getElementById("card").appendChild(elem);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <div style={{ paddingBottom: "10px	" }}>
        <form
          onSubmit={(e) => {
            signOut(e);
          }}
          style={{ marginLeft: "480px" }}
        >
          <Card
            id="card"
            style={{
              borderRadius: "40px",
              backgroundColor: "#e0e0eb",
              marginTop: "30px",
              width: "50%",
              paddingRight: "100px",
              paddingLeft: "100px",
              paddingBottom: "50px",
              marginBottom: "10px",
            }}
          >
            <h2
              style={{
                marginTop: "30px",
                marginBottom: "30px",
                textDecoration: "underline",
                marginLeft: "10px",
              }}
            >
              Add trip
            </h2>

            <div className="form-group">
              <label>Trip Number</label>
              <input
                id="tripNo"
                type="number"
                className="form-control"
                placeholder="Enter trip number"
                style={{ marginBottom: "10px" }}
              />
              {invalidTripNo ? (
                <span style={{ color: "red" }}>Empty trip number</span>
              ) : (
                <p></p>
              )}
            </div>

            <div className="form-group">
              <label>Train number</label>
              <input
                id="trainNo"
                type="number"
                className="form-control"
                placeholder="Enter train number"
                style={{ marginBottom: "10px" }}
              />
              {invalidTrainNo ? (
                <span style={{ color: "red" }}>Empty train number</span>
              ) : (
                <p></p>
              )}
            </div>

            <div className="form-group">
              <label>Train Type</label>
              <input
                id="trainType"
                type="text"
                className="form-control"
                placeholder="Enter train type"
                style={{ marginBottom: "10px" }}
              />
              {invalidType ? (
                <span style={{ color: "red" }}>Empty train type</span>
              ) : (
                <p></p>
              )}
            </div>

            <div className="form-group">
              <label>Ticket Price</label>
              <input
                id="price"
                type="price"
                className="form-control"
                placeholder="Enter price"
                style={{ marginBottom: "10px" }}
              />
              {invalidPrice ? (
                <span style={{ color: "red" }}>Empty price</span>
              ) : (
                <p></p>
              )}
            </div>

            <div className="form-group">
              <label>From</label>
              <input
                id="from"
                type="text"
                className="form-control"
                placeholder="Enter from where"
                style={{ marginBottom: "10px" }}
              />
              {invalidFrom ? (
                <span style={{ color: "red" }}>Empty from</span>
              ) : (
                <p></p>
              )}
            </div>
            <div className="form-group">
              <label>To</label>
              <input
                id="to"
                type="place"
                className="form-control"
                placeholder="Enter destination"
                style={{ marginBottom: "10px" }}
              />
              {invalidTo ? (
                <span style={{ color: "red" }}>Empty destination</span>
              ) : (
                <p></p>
              )}
            </div>
            <div className="form-group">
              <label>Time</label>
              <input
                id="time"
                type="text"
                className="form-control"
                placeholder="Choose time"
                style={{ marginBottom: "10px" }}
              />
              {invalidTime ? (
                <span style={{ color: "red" }}>Empty time</span>
              ) : (
                <p></p>
              )}
            </div>
            <br></br>
            <button type="submit" className="btn btn-primary" onClick={submit}>
              Submit
            </button>
          </Card>
        </form>
      </div>
      <button
        type="submit"
        onClick={signOut}
        className="btn btn-primary"
        style={{
          width: "150px",
          fontSize: "25px",
          position: "absolute",
          left: 0,
          top: 0,
          marginTop: "5vh",
          marginLeft: "88vw",
          boxShadow:
            "0 8px 25px 0 rgba(0,0,0,0.9), 0 6px 20px 0 rgba(0,0,0,0.9)",
          borderRadius: "40px",
        }}
      >
        Sign out
      </button>
    </div>
  );
}

export default Admin;
