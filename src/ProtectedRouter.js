import React from "react";
import { Route, Redirect } from "react-router-dom";

// to make the routes proteced and only authorized users can access
const ProtectedRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        if (window.localStorage.getItem("isAuthenticated") === "true") {
          return <Component {...props} />;
        } else {
          return <Redirect to="/" />;
        }
      }}
    />
  );
};

export default ProtectedRoute;
