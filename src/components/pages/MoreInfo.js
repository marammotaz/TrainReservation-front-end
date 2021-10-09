import React from "react";
import { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
// import images to display
import logo from "../images/roundedtrain.png";
import logo1 from "../images/rounded2.png";
import logo2 from "../images/rounded3.png";

import axios from "axios";
// import nav bar and footer components
import Footer from "./Footer";
import MyNav from "./MyNav";

function MoreInfo() {
  const [trips, setArrayTrips] = useState([]);
  const [isChanged, setIsChanged] = useState(false);

  useEffect(() => {
    function getData() {
      // to get all trips available
      axios
        .get(`${process.env.REACT_APP_BACKENDURL}/moreInfo`)
        .then((resp) => {
          setArrayTrips(resp.data);
          setIsChanged(true);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isChanged]);

  return (
    <div>
      <MyNav />
      <h1 style={{ marginTop: "60px", marginLeft: "60px" }}>Trips Details</h1>

      {isChanged ? (
        <div>
          {/* to loop on each trip*/}
          {trips.map((trip) => {
            var imgTemp = logo;
            if (trip.train_img === "roundedtrain") {
              imgTemp = logo;
            } else if (trip.train_img === "rounded2") {
              imgTemp = logo1;
            } else if (trip.train_img === "rounded3") {
              imgTemp = logo2;
            }
            return (
              <Card
                key={trip.trip_no}
                style={{
                  backgroundColor: "#e0e0eb",
                  marginTop: "30px",
                  width: "50%",
                  height: "250px",
                  marginLeft: "400px",
                  display: "flex",
                  flexWrap: "wrap",
                  flexDirection: "row",
                  borderRadius: "40px",
                }}
              >
                <div style={{ width: "33%" }}>
                  <img
                    src={imgTemp}
                    className="img-radius"
                    alt="User-Profile"
                    style={{
                      width: "160px",
                      marginLeft: "50px",
                      marginTop: "50px",
                    }}
                  />
                </div>
                <div style={{ width: "33%", marginTop: "20px" }}>
                  <p>Number:</p>
                  {isChanged ? (
                    <h6 style={{ color: "#3333ff", marginBottom: "20px" }}>
                      {trip.train_no}
                    </h6>
                  ) : (
                    <h6 style={{ color: "#3333ff", marginBottom: "20px" }}>
                      Loading...
                    </h6>
                  )}
                  <p>Type:</p>
                  {isChanged ? (
                    <h6 style={{ color: "#3333ff", marginBottom: "20px" }}>
                      {trip.train_type}
                    </h6>
                  ) : (
                    <h6 style={{ color: "#3333ff", marginBottom: "20px" }}>
                      Loading...
                    </h6>
                  )}
                  <p>From:</p>
                  {isChanged ? (
                    <h6 style={{ color: "#3333ff", marginBottom: "20px" }}>
                      {trip.from}
                    </h6>
                  ) : (
                    <h6 style={{ color: "#3333ff", marginBottom: "20px" }}>
                      Loading...
                    </h6>
                  )}
                </div>
                <div style={{ width: "33%", marginTop: "20px" }}>
                  <p>Time:</p>
                  {isChanged ? (
                    <h6 style={{ color: "#3333ff", marginBottom: "20px" }}>
                      {trip.trip_time}
                    </h6>
                  ) : (
                    <h6 style={{ color: "#3333ff", marginBottom: "20px" }}>
                      Loading...
                    </h6>
                  )}
                  <p>Price:</p>
                  {isChanged ? (
                    <h6 style={{ color: "#3333ff", marginBottom: "20px" }}>
                      {trip.price} EGP
                    </h6>
                  ) : (
                    <h6 style={{ color: "#3333ff", marginBottom: "20px" }}>
                      Loading...
                    </h6>
                  )}
                  <p>To:</p>
                  {isChanged ? (
                    <h6 style={{ color: "#3333ff" }}>{trip.to}</h6>
                  ) : (
                    <h6 style={{ color: "#3333ff", marginBottom: "20px" }}>
                      Loading...
                    </h6>
                  )}
                </div>
              </Card>
            );
          })}
        </div>
      ) : (
        <h1 style={{ marginLeft: "40px" }}>Loading</h1>
      )}

      <Footer />
    </div>
  );
}

export default MoreInfo;
