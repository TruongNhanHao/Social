import {
  RssFeed,
  Chat,
  PlayCircleFilledOutlined,
  Group,
  Bookmark,
  HelpOutline,
  WorkOutline,
  Event,
  School,
} from "@material-ui/icons";
import { Users } from "../dummyData";
import CloseFriend from "./CloseFriend";
import styled from "styled-components";

export default function Sidebar() {
  return (
    <Wrapper>
      <div>
        <ul>
          <li>
            <RssFeed className="Icon" />
            <span>Feed</span>
          </li>
          <li>
            <Chat className="Icon" />
            <span>Chats</span>
          </li>
          <li>
            <PlayCircleFilledOutlined className="Icon" />
            <span>Videos</span>
          </li>
          <li>
            <Group className="Icon" />
            <span>Groups</span>
          </li>
          <li>
            <Bookmark className="Icon" />
            <span>Bookmarks</span>
          </li>
          <li>
            <HelpOutline className="Icon" />
            <span>Questions</span>
          </li>
          <li>
            <WorkOutline className="Icon" />
            <span>Jobs</span>
          </li>
          <li>
            <Event className="Icon" />
            <span>Events</span>
          </li>
          <li>
            <School className="Icon" />
            <span>Courses</span>
          </li>
        </ul>
        <button>Show More</button>
        <hr />
        <ul className="FriendList">
          {Users.map((u) => (
            <CloseFriend key={u.id} user={u} />
          ))}
        </ul>
      </div>
    </Wrapper>
  );
}
const Wrapper = styled.div`
  flex: 3;
  height: calc(100vh - 50px);
  overflow-y: scroll;
  position: sticky;
  top: 50px;
  div {
    padding: 20px;
    ul {
      padding: 0;
      margin: 0;
      list-style: none;
      li {
        display: flex;
        align-items: center;
        margin-bottom: 20px;
        .Icon {
          margin-right: 15px;
        }
      }
    }
    button {
      width: 150px;
      border: none;
      padding: 10px;
      border-radius: 5px;
      font-weight: 500;
    }
    hr {
      margin: 20px 0;
    }
    .FriendList {
      padding: 0;
      margin: 0;
      list-style: none;
    }
  }
  ::-webkit-scrollbar {
    width: 5px;
  }
  ::-webkit-scrollbar-track {
    background-color: #f1f1f1;
  }
  ::-webkit-scrollbar-thumb {
    background-color: rgb(179, 179, 179);
  }
`;
