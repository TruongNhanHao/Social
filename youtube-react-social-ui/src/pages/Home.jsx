import Feed from "../components/Feed";
import Topbar from "../components/Topbar";
import Rightbar from "../components/Rightbar";
import styled from "styled-components";
import LeftBar from "../components/LeftBar";

export default function Home({ socket }) {
  return (
    <>
      <Topbar socket={socket} />
      <C>
        <LeftBar />
        <Feed socket={socket} />
        <Rightbar socket={socket} />
      </C>
    </>
  );
}

const C = styled.div`
  display: flex;
  width: 100%;
  margin: 0;
`;
