// import react components
import React from "react";
import { useHistory } from "react-router-dom";
// import style file
import "../styles/login.css";
import { Card } from "react-bootstrap";
//import axios to connect Api
import axios from "axios";
import { useState } from "react";

function CreateAccount() {
  // use history to navigate between pages
  const history = useHistory();

  // use state hooks
  const [invalidUser, setInvalidUser] = useState(false);
  const [invalidPass, setInvalidPass] = useState(false);
  const [invalidPhone, setInvalidPhone] = useState(false);
  const [invalidFirst, setInvalidFirst] = useState(false);
  const [invalidLast, setInvalidLast] = useState(false);
  const [invalidEmail, setInvalidEmail] = useState(false);

  //get the data from user inputs
  const routeChange = (e) => {
    e.preventDefault();
    let request = {
      firstName: document.getElementById("firstName").value,
      lastName: document.getElementById("lastName").value,
      phoneNo: document.getElementById("phoneNo").value,
      username: document.getElementById("user_input").value,
      email: document.getElementById("email").value,
      password: document.getElementById("pass_input").value,
    };
    // post request to backend
    axios
      .post(`${process.env.REACT_APP_BACKENDURL}/create`, request)
      .then((resp) => {
        if (resp.data.message === "User added") {
          // to go to login page
          let path = "/";
          history.push(path);
        }
        // to make sure all data is filled
        if (resp.data.message === "Fill first name") {
          setInvalidUser(false);
          setInvalidPass(false);
          setInvalidPhone(false);
          setInvalidFirst(true);
          setInvalidLast(false);
          setInvalidEmail(false);
        }
        if (resp.data.message === "Fill last name") {
          setInvalidUser(false);
          setInvalidPass(false);
          setInvalidPhone(false);
          setInvalidFirst(false);
          setInvalidLast(true);
          setInvalidEmail(false);
        }
        if (resp.data.message === "Fill phone number") {
          setInvalidUser(false);
          setInvalidPass(false);
          setInvalidPhone(true);
          setInvalidFirst(false);
          setInvalidLast(false);
          setInvalidEmail(false);
        }
        if (resp.data.message === "Fill username") {
          setInvalidUser(true);
          setInvalidPass(false);
          setInvalidPhone(false);
          setInvalidFirst(false);
          setInvalidLast(false);
          setInvalidEmail(false);
        }
        if (resp.data.message === "Fill email") {
          setInvalidUser(false);
          setInvalidPass(false);
          setInvalidPhone(false);
          setInvalidFirst(false);
          setInvalidLast(false);
          setInvalidEmail(true);
        }
        if (resp.data.message === "Fill password") {
          setInvalidUser(false);
          setInvalidPass(true);
          setInvalidPhone(false);
          setInvalidFirst(false);
          setInvalidLast(false);
          setInvalidEmail(false);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div style={{height:'120vh'}}>
      <form
        onSubmit={(e) => {
          routeChange(e);
        }}
        style={{ marginLeft: "29vw" }}
      >
        <Card
          style={{
            borderRadius: "4vw",
            backgroundColor: "#e0e0eb",
            marginTop: "5vh",
            width: "42vw",
            paddingRight: "6vw",
            paddingLeft: "6vw",
            paddingBottom: "8vh",
            marginBottom: "7vh",
            height: '105vh'
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
            Register
          </h2>

          <div className="form-group">
            <label>First name</label>
            <input
              id="firstName"
              type="text"
              className="form-control"
              placeholder="First name"
              style={{ marginBottom: "10px" }}
            />
            {invalidFirst ? (
              <span style={{ color: "red" }}>Empty first name</span>
            ) : (
              <p></p>
            )}
          </div>

          <div className="form-group">
            <label>Last name</label>
            <input
              id="lastName"
              type="text"
              className="form-control"
              placeholder="Last name"
              style={{ marginBottom: "10px" }}
            />
            {invalidLast ? (
              <span style={{ color: "red" }}>Empty last name</span>
            ) : (
              <p></p>
            )}
          </div>

          <div className="form-group">
            <label>Phone number</label>
            <input
              id="phoneNo"
              type="tel"
              className="form-control"
              placeholder="Telephone number"
              style={{ marginBottom: "10px" }}
            />
            {invalidPhone ? (
              <span style={{ color: "red" }}>Empty phone number</span>
            ) : (
              <p></p>
            )}
          </div>

          <div className="form-group">
            <label>Username</label>
            <input
              id="user_input"
              type="username"
              className="form-control"
              placeholder="Enter username"
              style={{ marginBottom: "10px" }}
            />
            {invalidUser ? (
              <span style={{ color: "red" }}>Empty username</span>
            ) : (
              <p></p>
            )}
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              id="email"
              type="email"
              className="form-control"
              placeholder="Enter email"
              style={{ marginBottom: "10px" }}
            />
            {invalidEmail ? (
              <span style={{ color: "red" }}>Empty email</span>
            ) : (
              <p></p>
            )}
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              id="pass_input"
              type="password"
              className="form-control"
              placeholder="Enter password"
              style={{ marginBottom: "10px" }}
            />
            {invalidPass ? (
              <span style={{ color: "red" }}>Invalid password</span>
            ) : (
              <p></p>
            )}
          </div>
          <br></br>
          <button type="submit" className="btn btn-primary">
            Sign Up
          </button>
          <p className="forgot-password text-right">
            Already registered <a href="/">log in?</a>
          </p>
        </Card>
      </form>
    </div>
  );
}

export default CreateAccount;
