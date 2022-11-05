import axios from "axios";
import { useEffect, useState } from "react";
import styled from "styled-components";

export default function ChatOnline({ onlineUsers, currentId, setCurrentChat }) {
  const [friends, setFriends] = useState([]);
  const [onlineFriends, setOnlineFriends] = useState([]);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  useEffect(() => {
    const getFriends = async () => {
      const res = await axios.get("/users/friends/" + currentId);
      setFriends(res.data);
    };
  getFriends();;
  }, [currentId]);

  useEffect(() => {

    setOnlineFriends(friends.filter((f) => onlineUsers.includes(f._id)));
  }, [friends, onlineUsers]);

  const handleClick = async (user) => {
    try {
      const res = await axios.get(
        `/conversations/find/${currentId}/${user._id}`
      );
      setCurrentChat(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Wrapper>
      {onlineFriends.map((o, index) => (
        <ChatOnlineFriend key={index} onClick={() => handleClick(o)}>
          <Container>
            <img
              className="chatOnlineImg"
              src={
                o?.profilePicture
                  ? PF + o.profilePicture
                  : PF + "person/noAvatar.png"
              }
              alt=""
            />
            <div className="chatOnlineBadge"></div>
          </Container>
          <span className="chatOnlineName">{o?.username}</span>
        </ChatOnlineFriend>
      ))}
    </Wrapper>
  );
}
const Wrapper = styled.div``;
const ChatOnlineFriend = styled.div`
  display: flex;
  align-items: center;
  font-weight: 500;
  cursor: pointer;
  margin-top: 10px;
  height: 50px;
`;
const Container = styled.div`
  position: relative;
  margin-right: 10px;
  /* .chatOnlineBadge {
    margin-top: 30px;
    margin-right: 5px;
  } */
  .chatOnlineImg {
    margin: 0;
  }
  img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    object-fit: cover;
    border: 1px solid white;
  }
  div {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color: limegreen;
    position: absolute;
    top: 2px;
    right: 2px;
  }
`;
