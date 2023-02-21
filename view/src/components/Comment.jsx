import { MoreVertOutlined } from "@material-ui/icons";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { format } from "timeago.js";
import Content from "./Content";

export default function Comment({ comment, handleClickDelete }) {
  const [users, setUsers] = useState([]);
  const [feedbacks, setFeedbacks] = useState(comment?.feedback);
  const [showInput, setShowInput] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [message, setMessage] = useState(comment.massage);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const currentUser = useSelector((state) => state.user.currentUser);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await axios.get("/users/" + comment.from);
      setUsers(res.data);
      try {
      } catch (error) {
        console.log(error);
      }
    };
    fetchUsers();
  }, [comment.from]);

  const handleClickUpdate = async () => {
    const updateComment = {
      message: message,
      from: comment.from,
    };
    await axios.put("/comment/" + comment._id, updateComment);
    setShowInput(false);
    try {
    } catch (error) {
      console.log(error);
    }
  };

  const handleClickFeedback = async () => {
    const newFeedback = {
      userId: currentUser._id,
      content: feedback,
    };
    try {
      await axios.put("/comment/feedback/" + comment._id, newFeedback);
      setFeedbacks((prev) => [...prev, newFeedback]);
    } catch (error) {
      console.log(error);
    }
  };
  // console.log(comment);
  return (
    <div>
      <CommentItem>
        <img
          src={
            users.profilePicture
              ? PF + "/" + users.profilePicture
              : PF + "/person/noAvatar.png"
          }
          alt=""
        />
        <div className="name">
          <h4>{users?.username}</h4>
          {!showInput && (
            <p>{message === undefined ? comment.message : message}</p>
          )}
          {showInput && (
            <Input>
              <input
                value={message === undefined ? comment.message : message}
                onChange={(e) => setMessage(e.target.value)}
              />
              <span onClick={handleClickUpdate}>SỮA</span>
            </Input>
          )}
        </div>
        <span className="date">{format(comment.createdAt)}</span>
        <div className="icon">
          <MoreVertOutlined onClick={() => setShow(!show)} />
          {show && (
            <div className="method">
              <p
                onClick={() => {
                  setShowInput(true);
                  setShow(!show);
                }}
              >
                Sữa
              </p>
              <hr />
              <p
                onClick={() => handleClickDelete(comment._id) && setShow(!show)}
              >
                Xóa
              </p>
            </div>
          )}
        </div>
      </CommentItem>
      <div>
        <Item>
          {feedbacks.map((item, index) => (
            <Content item={item} key={index} />
          ))}
          <Input>
            <input
              placeholder="Phản hồi"
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
            />
            <span onClick={handleClickFeedback}>GỬI</span>
          </Input>
        </Item>
      </div>
    </div>
  );
}
const CommentItem = styled.div`
  margin-bottom: 20px;
  margin-top: 30px;
  display: flex;
  gap: 20px;
  img {
    width: 40px;
    height: 40px;
  }
  .name {
    flex: 3.5;
    p {
      margin-top: 6px;
    }
  }
  .date {
    flex: 1;
    align-self: center;
    color: gray;
    font-size: 12px;
  }
  .icon {
    cursor: pointer;
    position: relative;
    div {
      z-index: 999;
      opacity: 1;
      background-color: teal;
    }
  }
  .method {
    position: absolute;
    display: block;
    width: 80px;
    box-shadow: 0px 0px 16px -8px rgba(0, 0, 0, 0.68);
    right: 0;
    text-align: center;
    padding: 4px;
    border-radius: 5px;
    p {
      color: white;
      width: 100%;
      padding: 4px 0;
      :hover {
        color: black;
        background-color: white;
        transition: 0.4s ease all;
      }
    }
  }
`;

const Item = styled.div`
  margin-top: 15px;
  border-top: none;
  border-left: 4px solid #efefef;
  margin-left: 27px;
  padding-left: 10px;
`;
const Input = styled.div`
  margin-top: 15px;
  cursor: pointer;
  input {
    border: 1px solid #ddd;
    border-radius: 4px;
    -webkit-border-radius: 4px;
    -moz-border-radius: 4px;
    font-size: 14px;
    color: #999;
    padding: 5px;
    width: 75%;
  }
  span {
    margin-left: 10px;
    padding: 6px 10px;
    border: 1px solid #288ad6;
    background: #fff;
    font-size: 13px;
    color: #288ad6;
    -moz-border-radius: 4px;
    -webkit-border-radius: 4px;
    border-radius: 4px;
  }
`;
