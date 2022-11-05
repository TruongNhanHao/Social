import Friends from "../assets/1.png";
import Groups from "../assets/2.png";
import Market from "../assets/3.png";
import Watch from "../assets/4.png";
import Memories from "../assets/5.png";
import Events from "../assets/6.png";
import Gaming from "../assets/7.png";
import Gallery from "../assets/8.png";
import Videos from "../assets/9.png";
import Messages from "../assets/10.png";
import Tutorials from "../assets/11.png";
import Courses from "../assets/12.png";
import Fund from "../assets/13.png";
import styled from "styled-components";
import { useSelector } from "react-redux";

const LeftBar = () => {
  const currentUser = useSelector((state) => state.user.currentUser);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  return (
    <Wrapper>
      <div className="container">
        <div className="menu">
          <div className="user">
            <img
              src={
                currentUser.profilePicture
                  ? PF + currentUser.profilePicture
                  : PF + "/person/noAvatar.png"
              }
              alt=""
            />
            <span>{currentUser.username}</span>
          </div>
          <div className="item">
            <img src={Friends} alt="" />
            <span>Friends</span>
          </div>
          <div className="item">
            <img src={Groups} alt="" />
            <span>Groups</span>
          </div>
          <div className="item">
            <img src={Market} alt="" />
            <span>Marketplace</span>
          </div>
          <div className="item">
            <img src={Watch} alt="" />
            <span>Watch</span>
          </div>
          <div className="item">
            <img src={Memories} alt="" />
            <span>Memories</span>
          </div>
        </div>
        <hr />
        <div className="menu">
          <span>Your shortcuts</span>
          <div className="item">
            <img src={Events} alt="" />
            <span>Events</span>
          </div>
          <div className="item">
            <img src={Gaming} alt="" />
            <span>Gaming</span>
          </div>
          <div className="item">
            <img src={Gallery} alt="" />
            <span>Gallery</span>
          </div>
          <div className="item">
            <img src={Videos} alt="" />
            <span>Videos</span>
          </div>
          <div className="item">
            <img src={Messages} alt="" />
            <span>Messages</span>
          </div>
        </div>
        <hr />
        <div className="menu">
          <span>Others</span>
          <div className="item">
            <img src={Fund} alt="" />
            <span>Fundraiser</span>
          </div>
          <div className="item">
            <img src={Tutorials} alt="" />
            <span>Tutorials</span>
          </div>
          <div className="item">
            <img src={Courses} alt="" />
            <span>Courses</span>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  flex: 3;
  height: calc(100vh - 50px);
  position: sticky;
  top: 50px;
  overflow-y: scroll;
  ::-webkit-scrollbar {
    width: 5px;
  }
  ::-webkit-scrollbar-track {
    background-color: #f1f1f1;
  }
  ::-webkit-scrollbar-thumb {
    background-color: rgb(179, 179, 179);
  }
  .container {
    padding: 25px;

    hr {
      margin: 15px 0px;
      border: none;
      height: 0.5px;
      background-color: themed("border");
    }

    .menu {
      display: flex;
      flex-direction: column;
      gap: 15px;

      span {
        font-size: 12px;
      }

      .user {
        display: flex;
        align-items: center;
        gap: 10px;

        img {
          width: 30px;
          height: 30px;
          border-radius: 50%;
          object-fit: cover;
        }

        span {
          font-size: 14px;
        }
      }

      .item {
        display: flex;
        align-items: center;
        gap: 10px;

        img {
          width: 30px;
        }

        span {
          font-size: 14px;
        }
      }
    }
  }
`;

export default LeftBar;
