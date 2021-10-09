import React from "react";

import { useHistory } from "react-router-dom";
import { useEffect, useState } from "react";

import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import "../styles/ticket.css";

import logo from "../images/qrcode.png";

function Ticket() {
  const history = useHistory();

  var request = JSON.parse(localStorage.getItem("userDetails"));
  var info = JSON.parse(localStorage.getItem("tripInfo"));
  var ticketInfo = JSON.parse(localStorage.getItem("ticketInfo"));

  const [isReturn, setIsReturn] = useState(true);
  const [temp, setTemp] = useState("");
  const [noOfTicketss] = useState(request.noOfTickets);
  const [arr] = useState([]);

  useEffect(() => {
    if (request.returnDate === null) {
      setIsReturn(false);
      // eslint-disable-next-line react-hooks/exhaustive-deps
      setTemp("500");
    } else {
      setIsReturn(true);
      setTemp(info.tripNoReturn.train_no);
    }

    for (var i = 0; i < noOfTicketss; i++) {
      arr.push(i);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const routeChange = () => {
    let path = "/trains";
    history.push(path);
  };

  return (
    <div
      className="page-content page-container"
      id="page-content"
      style={{ marginTop: "100px", marginLeft: "60px" }}
    >
      {arr.map((arr2) => {
        return (
          <div key={arr2}>
            <div className="padding">
              <div className="row container d-flex justify-content-center">
                <div className="col-xl-6 col-md-12">
                  <div
                    className="card user-card-full"
                    style={{ borderRadius: "40px" }}
                  >
                    <div className="row m-l-0 m-r-0">
                      <div className="col-sm-4 bg-c-lite-green user-profile">
                        <div className="card-block text-center text-white">
                          <div className="m-b-25">
                            {" "}
                            <img
                              src={logo}
                              className="radius"
                              alt="User-Profile"
                              style={{ width: "160px" }}
                            />{" "}
                          </div>
                          <h6 className="f-w-600">Scan This QR Code</h6>
                        </div>
                      </div>
                      <div
                        className="col-sm-8"
                        style={{ backgroundColor: "#e0e0eb" }}
                      >
                        <div className="card-block">
                          <h2
                            className="m-b-20 p-b-5 b-b-default f-w-600"
                            style={{ textDecoration: "underline" }}
                          >
                            Ticket Information
                          </h2>
                          <div className="row">
                            <div className="col-sm-6">
                              <p className="m-b-10 f-w-600">From</p>
                              <h6 className="text-muted f-w-400">
                                {request.from}
                              </h6>
                            </div>
                            <div className="col-sm-6">
                              <p className="m-b-10 f-w-600">To</p>
                              <h6 className="text-muted f-w-400">
                                {request.to}
                              </h6>
                            </div>
                            <br />
                            <br />
                            <br />

                            <div className="col-sm-6">
                              <p className="m-b-10 f-w-600">Date</p>
                              <h6 className="text-muted f-w-400">
                                {request.startDate}
                              </h6>
                            </div>
                            <div className="col-sm-6">
                              <p className="m-b-10 f-w-600">Time</p>
                              <h6 className="text-muted f-w-400">
                                {request.startTime}
                              </h6>
                            </div>
                            <br />
                            <br />
                            <br />
                            <div className="col-sm-6">
                              <p className="m-b-10 f-w-600">Train Number</p>
                              <h6 className="text-muted f-w-400">
                                {info.tripNoStart.train_no}
                              </h6>
                            </div>
                            {/* if the user books more than one ticket the seats will besides each other*/}
                            <div className="col-sm-6">
                              <p className="m-b-10 f-w-600">Seat Number</p>
                              <h6 className="text-muted f-w-400">
                                {ticketInfo.ticket.seat_no + arr2}
                              </h6>
                            </div>
                            <br />
                            <br />
                            <br />
                            <Popup
                              contentStyle={{ height: "300px", width: "300px" }}
                              trigger={
                                <button
                                  type="submit"
                                  className="btn btn-primary"
                                  onClick={routeChange}
                                  style={{
                                    marginTop: "30px",
                                    marginLeft: "100px",
                                    width: "150px",
                                  }}
                                >
                                  Print ticket{" "}
                                </button>
                              }
                              position="right center"
                            >
                              <div
                                style={{
                                  textAlign: "center",
                                  color: "orange",
                                  fontWeight: "bold",
                                  marginTop: "80px",
                                }}
                              >
                                {" "}
                                <p>
                                  Your trip has been successfully booked
                                </p>{" "}
                                <p style={{ fontSize: "20px" }}>
                                  Thanks for choosing us!
                                </p>
                                <button
                                  type="submit"
                                  className="btn btn-primary"
                                  onClick={routeChange}
                                  style={{
                                    backgroundColor: "orange",
                                    marginTop: "60px",
                                    marginLeft: "20px",
                                    width: "200px",
                                  }}
                                >
                                  Go to trains page{" "}
                                </button>{" "}
                              </div>
                            </Popup>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* check if there is a return ticket to print */}
            {isReturn ? (
              <div className="padding">
                <div className="row container d-flex justify-content-center">
                  <div className="col-xl-6 col-md-12">
                    <div
                      className="card user-card-full"
                      style={{ borderRadius: "40px" }}
                    >
                      <div className="row m-l-0 m-r-0">
                        <div className="col-sm-4 bg-c-lite-green user-profile">
                          <div className="card-block text-center text-white">
                            <div className="m-b-25">
                              {" "}
                              <img
                                src={logo}
                                className="radius"
                                alt="User-Profile"
                                style={{ width: "160px" }}
                              />{" "}
                            </div>
                            <h6 className="f-w-600">Scan This QR Code</h6>
                          </div>
                        </div>
                        <div
                          className="col-sm-8"
                          style={{ backgroundColor: "#e0e0eb" }}
                        >
                          <div className="card-block">
                            <h2
                              className="m-b-20 p-b-5 b-b-default f-w-600"
                              style={{ textDecoration: "underline" }}
                            >
                              Ticket Information
                            </h2>
                            <div className="row">
                              <div className="col-sm-6">
                                <p className="m-b-10 f-w-600">From</p>
                                <h6 className="text-muted f-w-400">
                                  {request.to}
                                </h6>
                              </div>
                              <div className="col-sm-6">
                                <p className="m-b-10 f-w-600">To</p>
                                <h6 className="text-muted f-w-400">
                                  {request.from}
                                </h6>
                              </div>
                              <br />
                              <br />
                              <br />

                              <div className="col-sm-6">
                                <p className="m-b-10 f-w-600">Date</p>
                                <h6 className="text-muted f-w-400">
                                  {request.returnDate}
                                </h6>
                              </div>
                              <div className="col-sm-6">
                                <p className="m-b-10 f-w-600">Time</p>
                                <h6 className="text-muted f-w-400">
                                  {request.returnTime}
                                </h6>
                              </div>
                              <br />
                              <br />
                              <br />
                              <div className="col-sm-6">
                                <p className="m-b-10 f-w-600">Train Number</p>
                                <h6 className="text-muted f-w-400">{temp}</h6>
                              </div>
                              <div className="col-sm-6">
                                <p className="m-b-10 f-w-600">Seat Number</p>
                                <h6 className="text-muted f-w-400">
                                  {ticketInfo.ticket.seat_no + arr2}
                                </h6>
                              </div>
                              <br />
                              <br />
                              <br />
                              <Popup
                                contentStyle={{
                                  height: "300px",
                                  width: "300px",
                                }}
                                trigger={
                                  <button
                                    type="submit"
                                    className="btn btn-primary"
                                    onClick={routeChange}
                                    style={{
                                      marginTop: "30px",
                                      marginLeft: "100px",
                                      width: "150px",
                                    }}
                                  >
                                    Print ticket{" "}
                                  </button>
                                }
                                position="right center"
                              >
                                <div
                                  style={{
                                    textAlign: "center",
                                    color: "orange",
                                    fontWeight: "bold",
                                    marginTop: "80px",
                                  }}
                                >
                                  {" "}
                                  <p>
                                    Your trip has been successfully booked
                                  </p>{" "}
                                  <p style={{ fontSize: "20px" }}>
                                    Thanks for choosing us!
                                  </p>
                                  <button
                                    type="submit"
                                    className="btn btn-primary"
                                    onClick={routeChange}
                                    style={{
                                      backgroundColor: "orange",
                                      marginTop: "60px",
                                      marginLeft: "20px",
                                      width: "200px",
                                    }}
                                  >
                                    Go to trains page{" "}
                                  </button>{" "}
                                </div>
                              </Popup>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <p> </p>
            )}
          </div>
        );
      })}
      <button
        type="submit"
        className="btn btn-primary"
        onClick={routeChange}
        style={{
          backgroundColor: "orange",
          marginTop: "60px",
          marginLeft: "20px",
          marginBottom: "50px",
          width: "200px",
        }}
      >
        Go to trains page{" "}
      </button>{" "}
    </div>
  );
}

export default Ticket;
