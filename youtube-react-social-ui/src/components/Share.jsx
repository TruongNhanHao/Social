import {
  PermMedia,
  Label,
  Room,
  EmojiEmotions,
  Cancel,
} from "@material-ui/icons";
import axios from "axios";
import { useRef, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

export default function Share() {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const desc = useRef();
  const [file, setFile] = useState(null);

  const user = useSelector((state) => state.user.currentUser);

  const submitHandler = async (e) => {
    e.preventDefault();
    const newPost = {
      userId: user._id,
      desc: desc.current.value,
    };
    if (file) {
      const data = new FormData();
      const fileName = Date.now() + file.name;
      data.append("name", fileName);
      data.append("file", file);
      newPost.img = fileName;
      console.log(newPost);
      try {
        await axios.post("/upload", data);
      } catch (err) {}
    }
    try {
      await axios.post("/posts", newPost);
      window.location.reload();
    } catch (err) {}
  };
  return (
    <Wrapper>
      <div className="h">
        <Top>
          <img
            src={
              user.profilePicture
                ? PF + user.profilePicture
                : PF + "/person/noAvatar.png"
            }
            alt=""
          />
          <input
            placeholder={"What's in your mind " + user.username + "?"}
            ref={desc}
          />
        </Top>
        <hr />
        {file && (
          <ShareImg>
            <img src={URL.createObjectURL(file)} alt="" className="shareImg" />
            <Cancel className="shareCancelImg" onClick={() => setFile(null)} />
          </ShareImg>
        )}
        <Bottom onSubmit={submitHandler}>
          <div className="shareOptions">
            <Option>
              <PermMedia htmlColor="tomato" className="shareIcon" />
              <span>Photo or Video</span>
              <input
                style={{
                  position: "absolute",
                  opacity: "0",
                  cursor: "pointer",
                }}
                type="file"
                id="file"
                accept=".png,.jpeg,.jpg"
                onChange={(e) => setFile(e.target.files[0])}
              />
            </Option>
            <Option>
              <Label htmlColor="blue" className="shareIcon" />
              <span>Tag</span>
            </Option>
            <Option>
              <Room htmlColor="green" className="shareIcon" />
              <span>Location</span>
            </Option>
            <Option>
              <EmojiEmotions htmlColor="goldenrod" className="shareIcon" />
              <span>Feelings</span>
            </Option>
          </div>
          <button type="submit">Share</button>
        </Bottom>
      </div>
    </Wrapper>
  );
}
const Wrapper = styled.div`
  width: 100%;
  border-radius: 10px;
  -webkit-box-shadow: 0px 0px 16px -8px rgba(0, 0, 0, 0.68);
  box-shadow: 0px 0px 16px -8px rgba(0, 0, 0, 0.68);
  .h {
    padding: 10px;
  }
  hr {
    margin: 20px;
  }
`;
const Top = styled.div`
  display: flex;
  align-items: center;
  img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    object-fit: cover;
    margin-right: 10px;
  }
  input {
    border: none;
    width: 80%;
  }
  input:focus {
    outline: none;
  }
`;
const Bottom = styled.form`
  display: flex;
  align-items: center;
  justify-content: space-between;
  .shareOptions {
    display: flex;
    margin-left: 20px;
  }
  button {
    border: none;
    padding: 7px;
    border-radius: 5px;
    background-color: green;
    font-weight: 500;
    margin-right: 20px;
    cursor: pointer;
    color: white;
  }
`;
const Option = styled.div`
  display: flex;
  cursor: pointer;
  align-items: center;
  margin-right: 15px;
  .shareIcon {
    font-size: 18px;
    margin-right: 3px;
  }
  span {
    font-size: 14px;
    font-weight: 500;
  }
`;
const ShareImg = styled.div`
  padding: 0 20px 10px 20px;
  position: relative;
  .shareImg {
    width: 50%;
    height: 50%;
    object-fit: cover;
  }
  .shareCancelImg {
    position: absolute;
    top: 0;
    right: 20px;
    cursor: pointer;
    opacity: 0.7;
  }
`;
