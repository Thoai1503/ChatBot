import React from "react";
import { Outlet } from "react-router-dom";
import NavBar from "../component/NavBar";

const BeginLayout = () => {
  return (
    <body>
      <NavBar />
      <Outlet />
    </body>
  );
};

export default BeginLayout;
