import "./style.css";
import { AiOutlineHeart, AiTwotoneHeart } from "react-icons/ai";
import { sendRequest } from "../../config/request";
import { useState } from "react";

const BookCard = ({ book }) => {
  const {
    _id,
    title,
    author,
    genre,
    review,
    pic_url,
    username,
    isLiked,
    likeCount,
  } = book;

  const [liked, setLiked] = useState(isLiked);
  const [likes, setLikes] = useState(likeCount);

  const handleLike = async () => {
    const response = await sendRequest({
      method: "POST",
      route: `/posts/toggle-like/${_id}`,
    });

    if (response.status === "success") {
      setLiked(!liked);
      if (liked) {
        setLikes(likes - 1);
      } else {
        setLikes(likes + 1);
      }
    }
  };

  return (
    <div className="book-card">
      <div className="book-image">
        <img src={pic_url} alt={title} />
      </div>
      <div className="book-content">
        <h3 className="book-title">{title}</h3>
        <p className="book-author">By {author}</p>
        <p className="book-genre">{genre}</p>
        <p className="book-review">{review}</p>
        <div className="book-actions">
          <button className="like-button" onClick={handleLike}>
            {liked ? (
              <AiTwotoneHeart className="like-button-red" />
            ) : (
              <AiOutlineHeart className="like-button-empty" />
            )}
            {likes} Likes
          </button>
          <p className="book-username">Posted by {username}</p>
        </div>
      </div>
    </div>
  );
};

export default BookCard;
