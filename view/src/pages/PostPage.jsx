import Rightbar from "../components/Rightbar";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import LeftBar from "../components/LeftBar";
import Post from "../components/Post";
import Topbar from "../components/Topbar";

export default function PostPage({ socket }) {
  const [post, setPost] = useState(undefined);
  const postId = useParams().postId;

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`/posts/` + postId);
      setPost(res.data);
    };
    fetchUser();
  }, [postId]);

  return (
    <>
      <Topbar socket={socket} />
      <C>
        <LeftBar />
        <Right>
          <Top>{post === undefined ? <></> : <Post post={post} />}</Top>
          <Bottom></Bottom>
        </Right>
        <Rightbar socket={socket} />
      </C>
    </>
  );
}
const C = styled.div`
  display: flex;
`;
const Right = styled.div`
  flex: 7;
  padding: 0 30px;
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
