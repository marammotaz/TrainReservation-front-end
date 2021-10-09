// import react-bootstrap components
import "bootstrap/dist/css/bootstrap.min.css";
import { Card } from "react-bootstrap";
// import axios to connect api
import axios from "axios";
// use hooks
import { useHistory } from "react-router-dom";
import { useState} from "react";
// import login style file
import "../styles/login.css";

function Login() {
  const history = useHistory();
  // use state hooks
  const [invalidUser, setInvalidUser] = useState(false);
  const [invalidPass, setInvalidPass] = useState(false);
  localStorage.clear();
  localStorage.setItem("isAuthenticated","null");

  // when click login
  const routeChange = (e) => {
    e.preventDefault();
    let request = {
      username: document.getElementById("username_input").value,
      password: document.getElementById("pass_input").value,
    };
    
    // to verify user authentication
    axios
      .post(`${process.env.REACT_APP_BACKENDURL}/login`, request)
      .then((resp) => {

        if (resp.data.message === "Admin") {
          window.localStorage.setItem("isAuthenticated", "true");
          let path = "/admin";
          history.push(path);
        }

        if (resp.data.message === "Successful login") {
          window.localStorage.setItem("isAuthenticated", "true");
          let path = "/trains";
          var request = {
            username: document.getElementById("username_input").value,
          };
          localStorage.setItem('userDetails', JSON.stringify(request));
          localStorage.setItem('tripInfo', JSON.stringify({}));
          history.push(path);
        }
        if (resp.data.message === "User not found") {
          setInvalidUser(true);
          setInvalidPass(false);
        }
        if (resp.data.message === "Password incorrect") {
          setInvalidUser(false);
          setInvalidPass(true);
        }
      })
      .catch((err) => {
        console.log(err);
      });
      
  };

  return (
    <div style={{ marginTop: "0px", padding: "0px" }}>
      <form
        onSubmit={(e) => {
          routeChange(e);
        }}
        style={{ marginLeft: "31vw"  }}
      >
        <Card
          style={{
            borderRadius: "4vw",
            backgroundColor: "#e0e0eb",
            marginTop: "10vh",
            width: "38vw",
            height: "75vh",
            paddingRight: "5vw",
            paddingLeft: "5vw",
            paddingBottom: "30vh",
          }}
        >
          <h2
            style={{
              marginTop: "30px",
              marginBottom: "30px",
              textDecoration: "underline",
            }}
          >
            Log in
          </h2>

          <div className="form-group">
            <label>Username</label>
            <input
              id="username_input"
              type="username"
              className="form-control"
              placeholder="Enter username"
            />
            {invalidUser ? (
              <span style={{ color: "red" }}>Invalid username</span>
            ) : (
              <p></p>
            )}
          </div>

          <div className="form-group">
            <label style={{ marginTop: "10px" }}>Password</label>
            <input
              id="pass_input"
              type="password"
              className="form-control"
              placeholder="Enter password"
            />
          </div>
          {invalidPass ? (
            <span style={{ color: "red", marginBottom: "10px" }}>
              Invalid password
            </span>
          ) : (
            <p></p>
          )}
          <div className="form-group">
            <div className="custom-control custom-checkbox">
              <input
                type="checkbox"
                className="custom-control-input"
                id="customCheck1"
                style={{ marginBottom: "30px" }}
              />
              <label
                className="custom-control-label"
                htmlFor="customCheck1"
                style={{ marginBottom: "20px" }}
              >
                Remember me
              </label>
            </div>
          </div>

          <button type="submit" className="btn btn-primary">
            Sign in
          </button>
          <p className="forgot-password text-right">
            Forgot <a href="/">password?</a>
          </p>
          <br></br>
          <p>
            New to this website? <a href="/create">Sign Up</a> now
          </p>
        </Card>
      </form>
    </div>
  );
}

export default Login;
