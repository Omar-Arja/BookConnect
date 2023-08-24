import React, { useState } from "react";
import "./style.css";
import { useNavigate } from "react-router-dom";


const SidebarItem = ({ label, selected, icon }) => {
  const navigate = useNavigate();

  const clickHandler = () => {
    const formattedLabel = label.toLowerCase().split(" ").join("-");
    navigate(`/${formattedLabel}`);
  };

  return (
    <div
      className={selected ? "sidebar-item active" : "sidebar-item"}
      onClick={() => clickHandler()}
    >
      {icon}
      {label}
    </div>
  );
};

export default SidebarItem;
