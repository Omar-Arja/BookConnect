import React, { useState } from "react";
import { sendRequest } from "../../config/request";
import { FaUserPlus, FaUserTimes } from "react-icons/fa";
import "./style.css";

const ProfileCard = ({ user }) => {
  const { _id, name, postsCount, isFollowing } = user;

  const [isFollowed, setIsFollowed] = useState(isFollowing);

  const handleFollow = async () => {
    try {
      const response = await sendRequest({
        method: "POST",
        route: `/users/toggle-follow/${_id}`,
      });

      if (response.status === "success") {
        setIsFollowed(!isFollowed);
      }
    } catch (error) {
      console.error("Error toggling follow:", error);
    }
  };

  return (
    <div className="profile-card">
      <div className="profile-info">
        <h3 className="profile-name">{name}</h3>
        <p className="profile-posts">Posts: {postsCount}</p>
      </div>
      <div className="profile-actions">
        {isFollowed ? (
          <button className="unfollow-button" onClick={handleFollow}>
            <FaUserTimes className="follow-icon" />
            Unfollow
          </button>
        ) : (
          <button className="follow-button" onClick={handleFollow}>
            <FaUserPlus className="follow-icon" />
            Follow
          </button>
        )}
      </div>
    </div>
  );
};

export default ProfileCard;
