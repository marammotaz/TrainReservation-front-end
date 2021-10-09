import React from "react";

import { Table } from "react-bootstrap";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

import "../styles/profile.css";
import logo from "../images/qr.png";
import logo44 from "../images/trainLogo.png";

import axios from "axios";

import Footer from "./Footer";

function Profile() {
  var request = JSON.parse(localStorage.getItem("userDetails"));
  var info = JSON.parse(localStorage.getItem("tripInfo"));

  const username = request.username;

  const [email, setEmail] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [isChanged, setIsChanged] = useState(false);
  const [isBooked, setIsBooked] = useState(false);
  const [isReturn, setIsReturn] = useState(false);

  useEffect(() => {
    function getData() {
      axios
        .post(`${process.env.REACT_APP_BACKENDURL}/profile`, { username })
        .then((resp) => {
          setEmail(resp.data.email);
          setPhoneNo(resp.data.phoneNo);
          setIsChanged(true);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    // check whether the user is paid or not
    if (info.tripNoStart !== undefined) {
      setIsBooked(true);
      // check if the ticket is going and coming
      if (info.tripNoReturn !== null) {
        setIsReturn(true);
      }
    }
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isChanged]);

  return (
    <div>
      <div>
        <Card id="aaa" style={{ color: "white", height: "55px" }}>
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <Link
                    className="nav-link"
                    to={{
                      pathname: "/trains",
                    }}
                    style={{
                      fontSize: "25px",
                      fontFamily: "Trebuchet MS",
                      fontWeight: "bold",
                    }}
                  >
                    Trains
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className="nav-link"
                    to={{
                      pathname: "/moreInfo",
                    }}
                    style={{
                      marginLeft: "10px",
                      fontSize: "25px",
                      fontFamily: "Trebuchet MS",
                      fontWeight: "bold",
                    }}
                  >
                    More Info
                  </Link>
                </li>
                <li className="nav-item active">
                  <Link
                    className="nav-link"
                    to={{
                      pathname: "/profile",
                    }}
                    style={{
                      marginLeft: "10px",
                      fontSize: "25px",
                      fontFamily: "Trebuchet MS",
                      fontWeight: "bold",
                    }}
                  >
                    Profile
                  </Link>
                </li>
                <img
                  src={logo44}
                  alt="logoooo"
                  style={{
                    height: "50 px",
                    width: "50px",
                    marginLeft: "960px",
                  }}
                />
                <li
                  className="nav-item"
                  style={{
                    marginLeft: "10px",
                    fontSize: "35px",
                    fontFamily: "Trebuchet MS",
                    fontWeight: "bold",
                    color: "black",
                  }}
                >
                  Go Train
                </li>
              </ul>
            </div>
          </nav>
        </Card>
      </div>
      <link
        href="//maxcdn.bootstrapcdn.com/bootstrap/4.1.1/css/bootstrap.min.css"
        rel="stylesheet"
        id="bootstrap-css"
      />
      <script src="//maxcdn.bootstrapcdn.com/bootstrap/4.1.1/js/bootstrap.min.js"></script>
      <script src="//cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
      <div
        className="container emp-profile"
        style={{
          borderRadius: "40px",
          width: "1200px",
          backgroundColor: "#e0e0eb",
        }}
      >
        <form method="post" style={{ textAlign: "center", marginLeft: "70px" }}>
          <h1
            style={{
              marginBottom: "30px",
              textDecoration: "underline",
              marginRight: "55px",
            }}
          >
            Your Profile
          </h1>
          <div className="row" style={{ width: "500px" }}>
            <div className="col-md-4">
              <img src={logo} alt="nouran" style={{ marginLeft: "50px" }} />
            </div>
            {/* display the trip details if the user paid ticket/s */}
            <div className="col-md-4">
              {isBooked ? (
                <Table
                  striped
                  bordered
                  hover
                  variant="light"
                  style={{
                    marginTop: "1px",
                    width: "1200px",
                    marginLeft: "150px",
                  }}
                >
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Trip Number</th>
                      <th>From</th>
                      <th>To</th>
                      <th style={{ minWidth: "100px" }}>Date</th>
                      <th>Time</th>
                      <th style={{ minWidth: "130px" }}>No of tickets</th>
                      <th>Ticket Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>1</td>
                      <td>{info.tripNoStart.trip_no}</td>
                      <td>{request.from}</td>
                      <td>{request.to}</td>
                      <td>{request.startDate}</td>
                      <td>{request.startTime}</td>
                      <td>{request.noOfTickets}</td>
                      <td>Paid</td>
                    </tr>

                    {isReturn ? (
                      <tr>
                        <td>2</td>
                        <td>{info.tripNoReturn.trip_no}</td>
                        <td>{request.to}</td>
                        <td>{request.from}</td>
                        <td>{request.returnDate}</td>
                        <td>{request.returnTime}</td>
                        <td>{request.noOfTickets}</td>
                        <td>Paid</td>
                      </tr>
                    ) : null}
                  </tbody>
                </Table>
              ) : (
                <h2
                  style={{
                    width: "400px",
                    marginLeft: "300px",
                    marginTop: "50px",
                    color: "red",
                  }}
                >
                  You don't have any trips yet.
                </h2>
              )}
              <div />
              <div />
            </div>
          </div>
          <div className="row">
            <div className="col-md-8">
              <div className="tab-content profile-tab" id="myTabContent">
                <div
                  className="tab-pane fade show active"
                  id="home"
                  role="tabpanel"
                  aria-labelledby="home-tab"
                >
                  <div className="row">
                    <div className="col-md-6">
                      <label
                        style={{
                          marginTop: "15px",
                          marginRight: "80px",
                          marginLeft: "50px",
                        }}
                      >
                        User Name
                      </label>
                    </div>
                    <div
                      className="col-md-6"
                      style={{
                        marginTop: "15px",
                        maxWidth: "1 0%",
                        flex: "60%",
                      }}
                    >
                      <p style={{ marginLeft: "68px", textAlign: "left" }}>
                        {username}
                      </p>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <label style={{ marginRight: "69px" }}>Email</label>
                    </div>
                    <div className="col-md-6">
                      <p style={{ marginRight: "180px", marginLeft: "68px" }}>
                        {email}
                      </p>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <label
                        style={{ marginRight: "80px", marginLeft: "48px" }}
                      >
                        Phone No.
                      </label>
                    </div>
                    <div className="col-md-6">
                      <p
                        style={{
                          marginRight: "180px",
                          marginLeft: "68px",
                          textAlign: "left",
                        }}
                      >
                        {phoneNo}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
      <Footer />
    </div>
  );
}

export default Profile;
