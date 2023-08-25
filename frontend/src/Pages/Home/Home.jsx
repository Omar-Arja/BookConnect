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
    const fetchBooks = async () => {
      try {
        if (debouncedSearchTerm) {
          const response = await sendRequest({
            method: "GET",
            route: `/posts/search?query=${debouncedSearchTerm}`,
          });
          if (response.status === "success") {
            setBooks(response.posts);
          }
        } else {
            fetchPosts();
        }
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };

    fetchBooks();
  }, [debouncedSearchTerm]);

  const fetchPosts = async () => {
    try {
      const response = await sendRequest({
        method: "GET",
        route: "/posts/default",
      });

      if (response.length > 0) {
        setBooks(response);
      } else {
        setBooks(null);
      }
      setLoading(false);
    } catch (error) {
      console.error("Error fetching posts:", error);
      setLoading(false);
    }
  };

  useEffect(() => {

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
        {books && (
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search books..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
            {<BiSearchAlt2 className="search-icon" />}
          </div>
        )}
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
          {books?.map((book) => (
            <BookCard key={book._id} book={book} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
