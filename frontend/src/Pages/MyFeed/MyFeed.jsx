import React, { useState } from "react";
import "./style.css";
import Sidebar from "../../Components/SideBar/SideBar";
import { BiSearchAlt2 } from "react-icons/bi";
import { AiOutlinePlus } from "react-icons/ai";
import { MdOutlineExplore, MdPersonSearch } from "react-icons/md";
import { FaUserAlt } from "react-icons/fa";


const MyFeed = () => {
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

    const [searchTerm, setSearchTerm] = useState("");
    const [books, setBooks] = useState(null);

    const handleSearch = async () => {
        
    };

    return (
        <div className="MyFeed">
            <Sidebar items={items} />
            <div className="main-content">
                { books && <div className="search-bar">
                    <input
                        type="text"
                        placeholder="Search books..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="search-input"
                    />
                    {<BiSearchAlt2 className="search-icon" />}
                </div>}
                <div className="book-results">

                </div>
            </div>
        </div>
    );
};

export default MyFeed;
