import "./style.css";
import { useState, useEffect } from "react";
import { sendRequest } from "../../config/request";
import Sidebar from "../../Components/SideBar/SideBar";
import { BiSearchAlt2 } from "react-icons/bi";
import { AiOutlinePlus } from "react-icons/ai";
import { MdOutlineExplore, MdPersonSearch } from "react-icons/md";
import { FaUserAlt } from "react-icons/fa";


const MyFeed = () => {

    useEffect(() => {
        const fetchPosts = async () => {
            const response = await sendRequest({ method: "GET", route: "/posts/" });
            console.log(response);

            if (response.length > 0) {
                setBooks(response);
            } else {
                setBooks(null);
            }
        };

        fetchPosts();
    }, []);

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
                { !books && <div className="empty-state">
                    <h2>Nothing to see here</h2>
                            </div>}
                <div className="book-results">

                </div>
            </div>
        </div>
    );
};

export default MyFeed;
