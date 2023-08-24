import React, { useEffect, useRef, useState } from "react";
import "./style.css";
import { BiLogOut } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import SidebarItem from "./SideBarItem";


const Sidebar = ({ items, selected = items[0].label }) => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const [selectedTab, setSelectedTab] = useState(selected);

  useEffect(() => {

    const currentPath = location.pathname.split("/")[1];
    if (currentPath) {
      if (currentPath === "my-feed") {

        setSelectedTab("My Feed");
      } else if (currentPath === "discover") {

        setSelectedTab("Discover");
      } else if (currentPath === "find-users") {

        setSelectedTab("Find Users");
      } else if (currentPath === "create-post") {

        setSelectedTab("Create Post");
      } else {
        setSelectedTab(currentPath);
      } 
    }
  }, [location]);

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
