import Feed from "../components/Feed";
import Topbar from "../components/Topbar";
import Rightbar from "../components/Rightbar";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import LeftBar from "../components/LeftBar";

export default function Profile({ socket }) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [user, setUser] = useState({});
  const username = useParams().username;
  console.log(username);
  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`/users?username=${username}`);
      setUser(res.data);
    };
    fetchUser();
  }, [username]);
  return (
    <>
      <Topbar socket={socket} />
      <C>
        <LeftBar />
        <Right>
          <Top>
            <div className="profileCover">
              <img
                className="profileCoverImg"
                src={
                  user.coverPicture
                    ? PF + user.coverPicture
                    : PF + "/person/login.jpg"
                }
                alt=""
              />
              <img
                className="profileUserImg"
                src={
                  user.profilePicture
                    ? PF + user.profilePicture
                    : PF + "/person/noAvatar.png"
                }
                alt=""
              />
            </div>
            <div className="profileInfo">
              <h4 className="profileInfoName">{user.username}</h4>
              <span className="profileInfoDesc">{user.desc}</span>
            </div>
          </Top>
          <Bottom>
            <Feed username={username} />
            <Rightbar user={user} socket={socket} />
          </Bottom>
        </Right>
      </C>
    </>
  );
}
const C = styled.div`
  display: flex;
`;
const Right = styled.div`
  flex: 9;
`;
const Top = styled.div`
  .profileCover {
    height: 320px;
    position: relative;
    .profileCoverImg {
      width: 100%;
      height: 250px;
      object-fit: cover;
    }

    .profileUserImg {
      width: 150px;
      height: 150px;
      border-radius: 50%;
      object-fit: cover;
      position: absolute;
      left: 0;
      right: 0;
      margin: auto;
      top: 150px;
      border: 3px solid white;
    }
  }

  .profileInfo {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    .profileInfoName {
      font-size: 24px;
    }

    .profileInfoDesc {
      font-weight: 300;
    }
  }
`;
const Bottom = styled.div`
  display: flex;
`;
