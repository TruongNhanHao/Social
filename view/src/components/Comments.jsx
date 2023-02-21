import styled from "styled-components";
import { useSelector } from "react-redux";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import Comment from "./Comment";

const Comments = ({ post, Fc }) => {
  const currentUser = useSelector((state) => state.user.currentUser);
  const [content, setContent] = useState("");
  const [comments, setComments] = useState([]);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  useEffect(() => {
    const fetchComment = async () => {
      const res = await axios.get("/comment/" + post);
      setComments(
        res.data.sort((p1, p2) => {
          return new Date(p2.createdAt) - new Date(p1.createdAt);
        })
      );
      console.log(res.data, post);
      try {
      } catch (error) {
        console.log(error);
      }
    };
    fetchComment();
  }, [post]);

  const handleClickCreate = async (e) => {
    e.preventDefault();
    const newComment = {
      from: currentUser._id,
      message: content,
      postId: post,
    };
    if (post.userId !== currentUser._id) {
      Fc(2);
    }
    try {
      const res = await axios.post("/comment", newComment);
      setComments((prev) => [...prev, res.data]);
      setContent("");
    } catch (err) {
      console.log(err);
    }
  };
  const handleDelete = async (i) => {
    try {
      await axios.delete("/comment/" + i);
      setComments(comments.filter((item) => item._id !== i));

      console.log(comments, i);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Wrapper>
      <Write>
        <img
          src={
            currentUser.profilePicture
              ? PF + "/" + currentUser.profilePicture
              : PF + "/person/noAvatar.png"
          }
          alt=""
        />

        <input
          type="text"
          value={content}
          placeholder="write a comment"
          onChange={(e) => setContent(e.target.value)}
        />
        <button onClick={(e) => handleClickCreate(e)}>Send</button>
      </Write>
      {comments?.map((comment, index) => (
        <Comment
          comment={comment}
          key={index}
          handleClickDelete={handleDelete}
        />
      ))}
    </Wrapper>
  );
};
const Wrapper = styled.div`
  img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    object-fit: cover;
  }
`;
const Write = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  margin: 20px 0px;

  input {
    flex: 5;
    padding: 10px;
    background-color: transparent;
  }

  button {
    border: none;
    background-color: #5271ff;
    color: white;
    padding: 10px;
    cursor: pointer;
    border-radius: 3px;
  }
`;

export default Comments;
