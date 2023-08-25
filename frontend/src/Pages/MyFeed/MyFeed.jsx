import "./style.css";
import React, { useState } from "react";
import Sidebar from "../../Components/SideBar/SideBar";
import BookCard from "../../Components/BookCard/BookCard";
import { sendRequest } from "../../config/request";
import { BiSearchAlt2 } from "react-icons/bi";
import { AiOutlinePlus } from "react-icons/ai";
import { MdOutlineExplore, MdPersonSearch } from "react-icons/md";
import { FaUserAlt } from "react-icons/fa";
import { useEffect } from "react";


const Home = () => {

    const [searchTerm, setSearchTerm] = useState("");
    const [books, setBooks] = useState(null);
    const [loading, setLoading] = useState(false);
    const [filteredBooks, setFilteredBooks] = useState(books);

    useEffect(() => {
        if (books && searchTerm) {
            const filteredbooks = books.filter((book) => {
                return (
                    book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    book.genre.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    book.review.toLowerCase().includes(searchTerm.toLowerCase())
                );
            });
            setFilteredBooks(filteredbooks);
        } else {
            setFilteredBooks(books);
        }
    }, [searchTerm]);

    useEffect(() => {
        const fetchPosts = async () => {
            setLoading(true);
            try {
                const response = await sendRequest({
                    method: "GET",
                    route: "/posts",
                });
    
                if (response.length > 0) {
                    setBooks(response);
                    setFilteredBooks(response);
                } else {
                    setBooks(null);
                }
            } catch (error) {
                console.error("Error fetching posts:", error);
            }
            setLoading(false);
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

    return (
        <div className="home">
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
                {!books && (
                    <div className="empty-state">
                        {loading ? (
                        <h1>Loading...</h1>
                        ) : (
                        <>
                            <h2>No Posts Yet</h2>
                            <button className="button">Share your favorite book</button>
                        </>
                        )}
                    </div>
                    )}

                <div className="book-results">
                    {filteredBooks?.map((book) => (
                        <BookCard key={book._id} book={book} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Home;
