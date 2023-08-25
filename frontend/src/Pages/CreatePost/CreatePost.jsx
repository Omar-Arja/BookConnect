import React, { useState } from "react";
import axios from "axios";
import "./style.css";
import Sidebar from "../../Components/SideBar/SideBar";
import { MdOutlineExplore, MdPersonSearch } from "react-icons/md";
import { FaUserAlt } from "react-icons/fa";
import { AiOutlinePlus } from "react-icons/ai";


const CreatePost = () => {
  const [data, setData] = useState({
    title: "",
    author: "",
    genre: "",
    review: "",
    pic: null,
    });

  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleDataChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
    };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("author", data.author);
    formData.append("genre", data.genre);
    formData.append("review", data.review);
    formData.append("pic", data.pic);

    try {
       const response = await axios.post(
           "http://localhost:8000/posts",
           formData,
           {
               headers: {
                   'Authorization': `Bearer ${localStorage.getItem("access_token")}`,
                   "Content-Type": "multipart/form-data",
               },
           }
       );
      if (response.status === "success") {

        setIsSuccess(true);
        setTimeout(() => {
          setIsSuccess(false);
          setData({
            title: "",
            author: "",
            genre: "",
            review: "",
            pic: null,
            });

        }, 2000);
      } else {
        console.log("Error creating post");
      }
    } catch (error) {
        console.error(error);
    } 
    setTimeout(() => {
        setIsLoading(false);
    }, 2000);
  };

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
      <>
        <Sidebar items={items} />
      <div className="create-post">
      <h2>Create a New Post</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="title"
          type="text"
          placeholder="Title"
          value={data.title}
          onChange={handleDataChange}
        />
        <input
          name="author"
          type="text"
          placeholder="Author"
          value={data.author}
          onChange={handleDataChange}
        />
        <input
          name="genre"
          type="text"
          placeholder="Genre"
          value={data.genre}
          onChange={handleDataChange}
        />
        <textarea
          name="review"
          placeholder="Review"
          value={data.review}
          onChange={handleDataChange}
        />
        <input
          name="pic"
          type="file"
          accept="image/*"
          onChange={(e) => setData({ ...data, pic: e.target.files[0] })}
        />
        <button type="submit" className={isLoading ? "loading" : ""}>
          {isLoading ? "Loading..." : isSuccess ? "Success" : "Submit"}
        </button>
      </form>
    </div>
    </>
  );
};

export default CreatePost;
