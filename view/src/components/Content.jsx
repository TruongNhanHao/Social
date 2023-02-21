import { format } from "timeago.js";
import styled from "styled-components";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Content({ item }) {
  const [user, setUser] = useState({});
  useEffect(() => {
    const fetchUsers = async () => {
      const res = await axios.get("/users/" + item.userId);
      setUser(res.data);
      try {
      } catch (error) {
        console.log(error);
      }
    };
    fetchUsers();
  }, [item.userId]);
  return (
    <Wrapper>
      <div className="name">
        <h4>{user.username}</h4>
        <p className="s">Phản Hồi</p>
      </div>
      <div className="h">
        <div className="text">{item.content}</div>
        <span>{format(item.createdAt)}</span>
      </div>
      <hr />
    </Wrapper>
  );
}
const Wrapper = styled.div`
  width: 300px;
  .name {
    display: flex;
    margin-top: 5px;
    .s {
      margin-left: 10px;
      border-radius: 4px;
      background-color: teal;
      color: white;
      height: 20px;
      line-height: 10px;
      padding: 5px;
    }
  }
  .text {
    margin-left: 10px;
    padding: 5px 0;
  }
  .h {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    justify-content: space-between;
    span {
      color: #2f80ed;
    }
    cursor: pointer;
  }
`;
