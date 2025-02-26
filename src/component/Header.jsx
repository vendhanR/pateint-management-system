import React from "react";
import { Toaster } from "react-hot-toast";
import { NavLink, Outlet } from "react-router-dom";

const Header = () => {
  return (
    <div className="w-full flex flex-col ">
      <div className="flex gap-4 justify-center py-2 shadow-md mb-4">
        <NavLink className={({isActive}) => (isActive ? "text-blue-800 font-semibold" : "")} to="/">Patient List</NavLink>
        <NavLink className={({isActive}) => (isActive ? "text-blue-800 font-semibold" : "")} to="/addpatient">Add Patient</NavLink>
        <NavLink className={({isActive}) => (isActive ? "text-blue-800 font-semibold" : "")} to="/appointment">Appointment</NavLink>
      </div>
      <div><Toaster/></div>
      <Outlet />
    </div>
  );
};

export default Header;
