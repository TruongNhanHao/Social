import Post from "./Post";
import styled from "styled-components";
import Share from "./Share";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import Stories from "./Stories";
import { useParams } from "react-router-dom";

export default function Feed({ username, socket }) {
  const [posts, setPosts] = useState([]);
  const user = useSelector((state) => state.user?.currentUser);
  const params = useParams().username;
  useEffect(() => {
    const fetchPosts = async () => {
      const res = username
        ? await axios.get("/posts/profile/" + username)
        : await axios.get("posts/timeline/" + user._id);
      setPosts(
        res.data.sort((p1, p2) => {
          return new Date(p2.createdAt) - new Date(p1.createdAt);
        })
      );
    };
    fetchPosts();
  }, [username, user._id]);
  return (
    <C>
      <div className="wrapper">
        {params === undefined ? <Stories /> : <></>}
        {(!username || username === user.username) && <Share />}
        {posts.map((p, index) => (
          <Post key={index} post={p} socket={socket} />
        ))}
      </div>
    </C>
  );
}
const C = styled.div`
  flex: 5.5;
  .wrapper {
    padding: 20px;
  }
`;
