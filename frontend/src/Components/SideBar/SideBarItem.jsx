import React, { useState } from "react";
import "./style.css";
import { useNavigate } from "react-router-dom";


const SidebarItem = ({ label, selected, onSelected, icon }) => {
  const navigate = useNavigate();

  const clickHandler = () => {
    const formattedLabel = label.toLowerCase().split(" ").join("-");
    onSelected(label);
    navigate(`/${formattedLabel}`);
    console.log(formattedLabel);
    console.log(label, selected);
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
