import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

export default function MakeFriend() {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const currentUser = useSelector((state) => state.user.currentUser);
  const [maybe, setMaybe] = useState(undefined);
  const [conf, setConf] = useState(undefined);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get("/users/all/user");
      if (conf) {
        setMaybe(
          res.data
            .filter((x) => !currentUser.followings.includes(x._id))
            .filter((x) => conf.some((y) => x._id !== y.senderId))
            .filter((x) => x._id !== currentUser._id)
        );
      } else {
        setMaybe(
          res.data
            .filter((x) => !currentUser.followings.includes(x._id))
            .filter((x) => x._id !== currentUser._id)
        );
      }
    };
    fetchUser();
  }, [conf, currentUser._id, currentUser.followings]);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get("/confirm/" + currentUser._id);
      if (res.data.length !== 0) {
        setConf(res.data);
      }
      console.log(res.data);
    };
    fetchUser();
  }, [currentUser._id]);

  const handleClickMakeFriend = async (receiverId) => {
    const newConfirm = {
      senderName: currentUser.username,
      senderId: currentUser._id,
      receiverId: receiverId,
    };
    try {
      await axios.post("/confirm", newConfirm);
      setMaybe(maybe.filter((item) => item._id !== receiverId));
    } catch (error) {
      console.log(error);
    }
  };
  const handleClickConFirm = async (id, senderId, receiverId) => {
    console.log(id, receiverId);
    const newConversations = {
      senderId: receiverId,
      receiverId: senderId,
    };
    try {
      await axios.delete("/confirm/" + id);
      setConf(conf.filter((item) => item._id !== id));
      await axios.post("/conversations", newConversations);
    } catch (error) {
      console.log(error);
    }
  };
  console.log(maybe, conf);
  return (
    <Wrapper>
      <div className="item">
        <span>Kết bạn để có thể chat</span>
        {maybe?.map((item, index) => (
          <div className="user" key={index}>
            <div className="userInfo">
              <img src={PF + "/person/noAvatar.png"} alt="" />
              <span>{item.username}</span>
            </div>
            <div
              className="buttons"
              onClick={() => handleClickMakeFriend(item._id)}
            >
              <button>Kết bạn</button>
            </div>
          </div>
        ))}
      </div>
      <div className="item">
        <span>Xác nhận lời mời</span>
        {conf?.map((item, index) => (
          <div className="user" key={index}>
            <div className="userInfo">
              <img src={PF + "/person/noAvatar.png"} alt="" />
              <span>{item.senderName}</span>
            </div>
            <div className="buttons">
              <button
                onClick={() =>
                  handleClickConFirm(item._id, item.senderId, item.receiverId)
                }
              >
                Xác Nhận
              </button>
            </div>
          </div>
        ))}
      </div>
    </Wrapper>
  );
}
const Wrapper = styled.li`
  .item {
    -webkit-box-shadow: 0px 0px 15px 1px rgba(0, 0, 0, 0.09);
    -moz-box-shadow: 0px 0px 15px 1px rgba(0, 0, 0, 0.09);
    box-shadow: 0px 0px 15px 1px rgba(0, 0, 0, 0.09);
    padding: 20px;
    margin-bottom: 30px;
    display: block;
    overflow-y: scroll;
    height: 230px;
    border-radius: 8px;
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
