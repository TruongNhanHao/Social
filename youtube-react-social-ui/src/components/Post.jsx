import {
  Share,
  Comment,
  Favorite,
  FavoriteBorder,
  MoreVert,
} from "@material-ui/icons";
import { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { format } from "timeago.js";
import Comments from "./Comments";
export default function Post({ post, socket }) {
  const [like, setLike] = useState(post?.likes.length);
  const [isLiked, setIsLiked] = useState(false);

  const [user, setUser] = useState({});
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  const currentUser = useSelector((state) => state.user.currentUser);
  const [commentOpen, setCommentOpen] = useState(false);

  useEffect(() => {
    if (post.likes.length === 0) {
      setIsLiked(0);
    } else {
      setIsLiked(post.likes.includes(currentUser._id));
    }
  }, [currentUser._id, post.likes]);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`/users?userId=${post.userId}`);
      setUser(res.data);
    };
    fetchUser();
  }, [post.userId]);
  const Fc = (type) => {
    socket.current.emit("sendNotification", {
      senderId: currentUser._id,
      receiverId: post.userId,
      senderName: currentUser.username,
      postId: post._id,
      type,
    });
  };
  const likeHandler = (receiverId, type) => {
    if (!isLiked && receiverId !== currentUser._id) {
      Fc(type);
    }

    try {
      axios.put("/posts/" + post._id + "/like", { userId: currentUser._id });
      setLike(isLiked ? like - 1 : like + 1);
      setIsLiked(!isLiked);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <Container>
      <Wrapper>
        <Top>
          <TopLeft>
            <Link to={`/profile/${user.username}`}>
              <img
                src={
                  user.profilePicture
                    ? PF + "/" + user.profilePicture
                    : PF + "/person/noAvatar.png"
                }
                alt=""
              />
            </Link>
            <span>{user.username}</span>
            <span className="Date">{format(post.createdAt)}</span>
          </TopLeft>
          <div className="postTopRight">
            <MoreVert />
          </div>
        </Top>
        <Center>
          <Link to={"/posts/" + post._id}>
            <span>{post?.desc}</span>
          </Link>
          <img src={PF + "/" + post.img} alt="" />
        </Center>
        <div className="info">
          <div className="item" onClick={() => likeHandler(post.userId, 1)}>
            {isLiked ? <Favorite /> : <FavoriteBorder />}
            {like} Likes
          </div>
          <div className="item" onClick={() => setCommentOpen(!commentOpen)}>
            <Comment />
            Comments
          </div>
          <div className="item">
            <Share />
            Share
          </div>
        </div>
        {commentOpen && <Comments post={post._id} Fc={Fc} />}
      </Wrapper>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  border-radius: 10px;
  -webkit-box-shadow: 0px 0px 16px -8px rgba(0, 0, 0, 0.68);
  box-shadow: 0px 0px 16px -8px rgba(0, 0, 0, 0.68);
  margin: 30px 0;
`;
const Wrapper = styled.div`
  padding: 10px;
  .info {
    display: flex;
    align-items: center;
    gap: 20px;

    .item {
      display: flex;
      align-items: center;
      gap: 10px;
      cursor: pointer;
      font-size: 14px;
    }
  }
`;
const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const TopLeft = styled.div`
  display: flex;
  align-items: center;
  img {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    object-fit: cover;
  }
  span {
    font-size: 15px;
    font-weight: 500;
    margin: 0 10px;
  }
  .Date {
    font-size: 12px;
  }
`;
const Center = styled.div`
  margin: 20px 0;
  img {
    margin-top: 20px;
    width: 100%;
    max-height: 500px;
    object-fit: contain;
  }
`;
