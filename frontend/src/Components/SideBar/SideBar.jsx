import React, { useEffect, useRef, useState } from "react";
import "./style.css";
import { BiLogOut } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import SidebarItem from "./SideBarItem";

const Sidebar = ({ items, selected = items[0].label }) => {
  console.log(items);
  const navigate = useNavigate();
  
  const [selectedTab, setSelectedTab] = useState(selected);

  const selectHandler = (label) => {
    setSelectedTab(label);
  };

  const logoutButton = useRef();
  
  const onLogout = () => {
      localStorage.removeItem("access_token");
      navigate("/");
    };
    
  const handleLogout = () => {
    logoutButton.current.textContent = <BiLogOut /> + "Logging Out...";
    onLogout();
  };

  return (
    <div className="sidebar">
      <div className="logo">
        {/* <img src={logo} alt="logo" /> */}
      </div>
      <div className="items">
        {items?.map((item, index) => (
          <SidebarItem
            key={index}
            label={item.label}
            selected={selectedTab === item.label}
            onSelected={(label) => selectHandler(label)}
            icon={item.icon}
          />
        ))}
      </div>
      <div className="logout" onClick={handleLogout} ref={logoutButton}>
        <BiLogOut />
        Log out
      </div>
    </div>
  );
};

export default Sidebar;
