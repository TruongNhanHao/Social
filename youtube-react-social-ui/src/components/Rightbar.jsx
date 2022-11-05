import { Add, Remove } from "@material-ui/icons";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { FOLLOW, UNFOLLOW } from "../context/userSlice";
import ChatOnline from "./ChatOnline";

export default function Rightbar({ user, socket }) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [friends, setFriends] = useState([]);
  const [maybe, setMaybe] = useState(undefined);
  const dispatch = useDispatch();

  const currentUser = useSelector((state) => state.user.currentUser);
  const [followed, setFollowed] = useState(
    currentUser.followings.includes(user?._id)
  );
  const [currentChat, setCurrentChat] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  console.log(currentChat);
  useEffect(() => {
    // socket.current = io("ws://localhost:8900");
    socket.current.on("getUsers", (users) => {
      setOnlineUsers(
        currentUser.followings.filter((f) => users.some((u) => u.userId === f))
      );
    });
  }, [currentUser._id, currentUser.followings, socket]);
  useEffect(() => {
    const getFriends = async () => {
      try {
        const friendList = await axios.get("/users/friends/" + user?.userId);
        setFriends(friendList.data);
      } catch (err) {
        console.log(err);
      }
    };
    getFriends();
  }, [user]);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get("/users/all/user");
      setMaybe(
        res.data
          .filter((x) => !currentUser.followings.includes(x._id))
          .filter((x) => x._id !== currentUser._id)
      );
    };
    fetchUser();
  }, [currentUser._id, currentUser.followings]);
  const handleClick = async () => {
    try {
      if (followed) {
        await axios.put(`/users/${user._id}/unfollow`, {
          userId: currentUser._id,
        });
        dispatch(UNFOLLOW(user._id));
      } else {
        await axios.put(`/users/${user._id}/follow`, {
          userId: currentUser._id,
        });
        dispatch(FOLLOW(user._id));
      }
      setFollowed(!followed);
    } catch (err) {}
  };

  const HomeRightbar = () => {
    return (
      <Home>
        <div className="item">
          <span>Có thể bạn quen</span>
          {maybe?.map((item, index) => (
            <div className="user" key={index}>
              <div className="userInfo">
                <img src={PF + "/person/noAvatar.png"} alt="" />
                <span>{item.username}</span>
              </div>
              <div className="buttons">
                <button>Kết bạn</button>
                <button>Theo dõi</button>
              </div>
            </div>
          ))}
        </div>
        <div className="online">
          <Title>Online Friends</Title>
          <div className="m">
            <ChatOnline
              onlineUsers={onlineUsers}
              currentId={currentUser._id}
              setCurrentChat={setCurrentChat}
            />
          </div>
        </div>
      </Home>
    );
  };

  const ProfileRightbar = () => {
    return (
      <>
        {user.username !== currentUser.username && (
          <H onClick={handleClick}>
            {currentUser.followings.includes(user?._id) === true
              ? "Unfollow"
              : "Follow"}
            {currentUser.followings.includes(user?._id) === true ? (
              <Remove />
            ) : (
              <Add />
            )}
          </H>
        )}
        <Title>User information</Title>
        <Info>
          <div>
            <span>Thành phố:</span>
            <span>Cần thơ</span>
          </div>
          <div>
            <span>Từ:</span>
            <span>Sóc Trăng</span>
          </div>
          <div>
            <span>Quan Hệ:</span>
            <span>Độc Thân</span>
          </div>
        </Info>
        <Title>User friends</Title>
        <Following>
          {friends.map((friend, index) => (
            <Link
              key={index}
              to={"/profile/" + friend.username}
              style={{ textDecoration: "none" }}
            >
              <div>
                <img
                  src={
                    friend.profilePicture
                      ? PF + friend.profilePicture
                      : PF + "/person/noAvatar.png"
                  }
                  alt=""
                />
                <span>{friend.username}</span>
              </div>
            </Link>
          ))}
        </Following>
      </>
    );
  };
  return (
    <Container>
      <Wrapper>{user ? <ProfileRightbar /> : <HomeRightbar />}</Wrapper>
    </Container>
  );
}
const Container = styled.div`
  flex: 3.5;
`;
const Wrapper = styled.div`
  padding: 20px 20px 0 0;
`;
const Home = styled.div`
  .online {
    display: block;
    overflow-y: scroll;
    height: 400px;
    ::-webkit-scrollbar {
      width: 5px;
    }
    ::-webkit-scrollbar-track {
      background-color: #f1f1f1;
    }
    ::-webkit-scrollbar-thumb {
      background-color: rgb(179, 179, 179);
    }
    padding: 15px 30px;
    -webkit-box-shadow: 0px 0px 15px 1px rgba(0, 0, 0, 0.09);
    -moz-box-shadow: 0px 0px 15px 1px rgba(0, 0, 0, 0.09);
    box-shadow: 0px 0px 15px 1px rgba(0, 0, 0, 0.09);
    display: block;
    padding: 5px;
  }
  ul {
    padding: 0 30px;
    margin: 0;
    list-style: none;
  }
  img {
    width: 100%;
    border-radius: 10px;
    margin: 30px 0;
  }
  div {
    display: flex;
    align-items: center;
    img {
      width: 40px;
      height: 40px;
      margin-right: 10px;
    }
    span {
      font-weight: 300;
      font-size: 15px;
    }
  }
  .item {
    -webkit-box-shadow: 0px 0px 15px 1px rgba(0, 0, 0, 0.09);
    -moz-box-shadow: 0px 0px 15px 1px rgba(0, 0, 0, 0.09);
    box-shadow: 0px 0px 15px 1px rgba(0, 0, 0, 0.09);
    padding: 20px;
    margin-bottom: 10px;
    display: block;
    overflow-y: scroll;
    height: 230px;
    ::-webkit-scrollbar {
      width: 5px;
    }
    ::-webkit-scrollbar-track {
      background-color: #f1f1f1;
    }
    ::-webkit-scrollbar-thumb {
      background-color: rgb(179, 179, 179);
    }
    span {
      color: gray;
    }

    .user {
      display: flex;
      height: 50px;
      align-items: center;
      justify-content: space-between;
      margin: 10px 0px;

      .userInfo {
        display: flex;
        align-items: center;
        gap: 20px;
        height: 50px;
        position: relative;

        img {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          object-fit: cover;
        }

        .online {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background-color: limegreen;
          position: absolute;
          top: 0;
          left: 30px;
        }
      }

      .buttons {
        display: flex;
        align-items: center;
        gap: 10px;

        button {
          border: none;
          padding: 5px;
          color: white;
          cursor: pointer;

          &:first-child {
            background-color: #5271ff;
          }

          &:last-child {
            background-color: #f0544f;
          }
        }
      }
    }
  }
`;
const Title = styled.h4`
  margin-bottom: 20px;
`;
const Info = styled.div`
  margin-bottom: 30px;
  div {
    margin-bottom: 10px;
    span {
      font-weight: 500;
      margin-right: 15px;
      color: #555;
    }
    span {
      font-weight: 300;
    }
  }
`;
const Following = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
  cursor: pointer;
  div {
    display: flex;
    flex-direction: column;
    margin-bottom: 20px;
    cursor: pointer;
    img {
      width: 100px;
      height: 100px;
      object-fit: cover;
      border-radius: 5px;
    }
  }
`;
const H = styled.div`
  margin-top: 30px;
  margin-bottom: 10px;
  border: none;
  background-color: #1872f2;
  color: white;
  border-radius: 5px;
  padding: 5px 10px;
  display: flex;
  align-items: center;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
`;
