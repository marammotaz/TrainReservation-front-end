import React from "react";


import { useState } from "react";
import { useHistory } from "react-router-dom";

import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import { Card, DropdownButton, Dropdown } from "react-bootstrap";

import MyNav from "./MyNav";
import Footer from "./Footer";

import axios from "axios";


function Trains() {

  const [tempDate, setTempDate] = useState(new Date());
  const [tempDate2, setTempDate2] = useState(new Date());
  const [removeReturn, setRemoveReturn] = useState(true);

// intialize variables
  var startDate = "";
  var startTime = "";
  var noOfTickets = 0;
  var returnDate = "";
  var returnTime = "";

  const [oneWay, setOneWay] = useState("no");
  const [travelFrom, setTravelFrom] = useState("no");
  const [arrivingTo, setArrivingTo] = useState("no");
  const [isNotAvailable, setIsNotAvailable] = useState(false);

  const history = useHistory();

// return to login page
  const signOut=()=>{
    localStorage.setItem("isAuthenticated","null");
    history.push("/");
  }

  const routeChange = () => {
    noOfTickets = document.getElementById("noTickets").value;
    if (oneWay === "no") {
      alert("Please choose either the ticket is one way or not");
    } else if (travelFrom === "no") {
      alert("Please choose the city you are travelling from");
    } else if (arrivingTo === "no") {
      alert("Please choose the city you are travelling to");
    } else if (noOfTickets <= 0) {
      alert("Please enter a positive number of tickets");
    } else {
      // to adjust the date and time format
      startDate = tempDate.toDateString().toString();
      startTime = tempDate.toLocaleTimeString().toString();
      if (startTime[1] === ":") {
        startTime = "0" + startTime;
      }
      startTime =
        startTime[0] +
        startTime[1] +
        startTime[2] +
        startTime[3] +
        startTime[4] +
        startTime[8] +
        startTime[9] +
        startTime[10];

      if (startTime[0] === "0") {
        startTime =
          startTime[1] +
          startTime[2] +
          startTime[3] +
          startTime[4] +
          startTime[5] +
          startTime[6] +
          startTime[7];
      }
      // check whether the user books a return ticket or not
      if (oneWay === "false") {
        returnDate = tempDate2.toDateString().toString();
        returnTime = tempDate2.toLocaleTimeString().toString();
        if (returnTime[1] === ":") {
          returnTime = "0" + returnTime;
        }
        returnTime =
          returnTime[0] +
          returnTime[1] +
          returnTime[2] +
          returnTime[3] +
          returnTime[4] +
          returnTime[8] +
          returnTime[9] +
          returnTime[10];

        if (returnTime[0] === "0") {
          returnTime =
            returnTime[1] +
            returnTime[2] +
            returnTime[3] +
            returnTime[4] +
            returnTime[5] +
            returnTime[6] +
            returnTime[7];
        }
      } else {
        returnTime = null;
        returnDate = null;
      }

      const request = {
        username: JSON.parse(localStorage.getItem('userDetails')).username,
        seat_no: 26,
        cart_number: 5,
        startDate: startDate,
        returnDate: returnDate,
        from: travelFrom,
        to: arrivingTo,
        startTime: startTime,
        returnTime: returnTime,
        noOfTickets: noOfTickets,
      };

      axios
        .post(`${process.env.REACT_APP_BACKENDURL}/trains`, request)
        .then((resp) => {
          var info = resp.data;
          
          // make sure that there are comptaible trips with the user requested details
          if (info.tripNoStart !== "no" && info.tripNoReturn !== "no") {
            let path = "/payment";
            localStorage.setItem('userDetails', JSON.stringify(request));
            localStorage.setItem('tripInfo', JSON.stringify(info));
            history.push(path);
          }
          else{
            setIsNotAvailable(true);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  // to control actions on Radio buttons
  const onValueChange = (event) => {
    setOneWay(event.target.value);
    if (event.target.value === "false") {
      setRemoveReturn(true);
    } else setRemoveReturn(false);
  };
    // to control actions on DropDown menu
  const fromFun = (data) => {
    setTravelFrom(data);
  };

  const toFun = (data) => {
    setArrivingTo(data);
  };

  return (
    <div>
      <MyNav />

      <div
        style={{
          opacity: "0.8",
          padding: "50px",
          height: "660px",
          textAlign: "left",
          backgroundSize: "cover",
          backgroundImage:
            'url("https://images.pexels.com/photos/159148/regional-train-rail-cars-platform-deutsche-bahn-159148.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260")',
          backgroundRepeat: "no-repeat",
        }}
      >
        
        <Card
          style={{
            boxShadow:
              "0 8px 25px 0 rgba(0,0,0,0.9), 0 6px 20px 0 rgba(0,0,0,0.9)",
            borderRadius: "40px",
            backgroundColor: "#e0e0eb",
            opacity: 1,
            marginLeft: "50px",
            marginBottom: "30px",
            marginTop: "10px",
            width: "500px",
            paddingRight: "50px",
            paddingLeft: "80px",
            paddingBottom: "20px",
          }}
        >
          <h1
            style={{
              textAlign: "center",
              marginTop: "10px",
              marginBottom: "20px",
              textDecoration: "underline",
            }}
          >
            Book Now!
          </h1>
          <div style={{ display: "flex", flexWrap: "wrap" }}>
            <input
              type="radio"
              value="true"
              name="type"
              onChange={onValueChange}
            />{" "}
            One Way Ticket
            <input
              type="radio"
              value="false"
              name="type"
              onChange={onValueChange}
              style={{ marginLeft: "40px", marginBottom: "40px" }}
            />{" "}
            Going and coming back
          </div>

          <div style={{ display: "flex", flexWrap: "wrap" }}>
            <label
              style={{
                marginLeft: "30px",
                marginRight: "40px",
                marginBottom: "50px",
              }}
            >
              Travel From
            </label>
            <DropdownButton
              id="dropdown-basic-button"
              title="Travel from"
              style={{ textAlign: "center" }}
            >
              <Dropdown.Item as="button" onClick={() => fromFun("Cairo")}>
                Cairo
              </Dropdown.Item>
              <Dropdown.Item as="button" onClick={() => fromFun("Alexandria")}>
                Alexandria
              </Dropdown.Item>
              <Dropdown.Item
                as="button"
                onClick={() => fromFun("Marsa Matrouh")}
              >
                Marsa Matrouh
              </Dropdown.Item>
            </DropdownButton>
            <label style={{ marginLeft: "33px", marginBottom: "50px" }}>
              Arriving to
            </label>
            <DropdownButton
              id="dropdown-basic-button"
              title="Arriving to"
              style={{ textAlign: "center", marginLeft: "45px" }}
            >
              <Dropdown.Item as="button" onClick={() => toFun("Cairo")}>
                Cairo
              </Dropdown.Item>
              <Dropdown.Item as="button" onClick={() => toFun("Alexandria")}>
                Alexandria
              </Dropdown.Item>
              <Dropdown.Item as="button" onClick={() => toFun("Marsa Matrouh")}>
                Marsa Matrouh
              </Dropdown.Item>
            </DropdownButton>
          </div>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              flexDirection: "row",
              marginLeft: "60px",
            }}
          >
            <label style={{ marginRight: "20px" }}>
              Choose the date and time
            </label>
            <DatePicker
              selected={tempDate}
              onChange={(date) => setTempDate(date)}
              showTimeSelect
              dateFormat="Pp"
            />
            {removeReturn ? (
              <div>
                {" "}
                <label style={{ marginRight: "20px" }}>Return date</label>
                <DatePicker
                  selected={tempDate2}
                  onChange={(date2) => setTempDate2(date2)}
                  showTimeSelect
                  dateFormat="Pp"
                />{" "}
              </div>
            ) : (
              <div></div>
            )}
          </div>

          <label style={{ marginTop: "20px", marginRight: "10px" }}>
            Number of tickets
          </label>
          <input
            id="noTickets"
            type="Number"
            placeholder="Enter number"
            style={{ marginBottom: "10px" }}
          />
          <button
            type="submit"
            className="btn btn-primary"
            onClick={routeChange}
            style={{ marginTop: "30px", marginLeft: "120px", width: "120px" }}
          >
            Book now
          </button>
          {
            isNotAvailable? <p style={{textAlign:'center', color:'red',marginTop:'15px'}}>Please choose correct date and time, please check more info page for trips</p> : <p></p>
          }
        </Card>
        <button type="submit" onClick={signOut} className="btn btn-primary" style={{width:'150px',fontSize:'25px',position:'absolute',left:0,top:0,marginTop:'13vh',marginLeft:'88vw',boxShadow:"0 8px 25px 0 rgba(0,0,0,0.9), 0 6px 20px 0 rgba(0,0,0,0.9)",borderRadius: "40px"}}>
            Sign out
          </button>
      </div>
      <Footer/>
    </div>
  );
}

export default Trains;
