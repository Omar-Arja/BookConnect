import React, { useState, useEffect } from "react";
import { sendRequest } from "../../config/request";
import Sidebar from "../../Components/SideBar/SideBar";
import ProfileCard from "../../Components/ProfileCard/ProfileCard";
import { MdOutlineExplore, MdPersonSearch } from "react-icons/md";
import { FaUserAlt } from "react-icons/fa";
import { AiOutlinePlus } from "react-icons/ai";
import { BiSearchAlt2 } from "react-icons/bi";
import "./style.css";

const FindUsers = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const useDebounce = (value, delay) => {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
      const timer = setTimeout(() => {
        setDebouncedValue(value);
      }, delay);

      return () => {
        clearTimeout(timer);
      };
    }, [value, delay]);

    return debouncedValue;
  };

  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        if (debouncedSearchTerm) {
          const response = await sendRequest({
            method: "GET",
            route: `/users/search?query=${debouncedSearchTerm}`,
          });
          if (response.status === "success") {
            setUsers(response.users);
          }
        } else {
          setUsers([]);
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching users:", error);
        setLoading(false);
      }
    };

    console.log(users);

    fetchUsers();
  }, [debouncedSearchTerm]);

  const items = [
    {
      label: "Discover",
      icon: <MdOutlineExplore />,
    },
    {
      label: "My Feed",
      icon: <FaUserAlt />,
    },
    {
      label: "Find Users",
      icon: <MdPersonSearch className="find-users-icon" />,
    },
    {
      label: "Create Post",
      icon: <AiOutlinePlus className="create-post-icon" />,
    },
  ];

  return (
    <div className="find-users">
      <Sidebar items={items} />
      <div className="main-content">
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          {<BiSearchAlt2 className="search-icon" />}
        </div>
        {loading ? (
          <h1>Loading...</h1>
        ) : (
          <div className="user-results">
            {users.length === 0 && (
              <div className="empty-state">
                <h1>Find other book lovers</h1>
              </div>
            )}
            {users?.map((user) => (
              <ProfileCard key={user._id} user={user} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FindUsers;
