import { format } from "timeago.js";
import styled from "styled-components";
import Image from "./Image";
import { useEffect, useState } from "react";

export default function Message({ message, own }) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  // const [fileDataURL, setFileDataURL] = useState(null);

  // useEffect(() => {
  //   let fileReader,
  //     isCancel = false;
  //   if (message.img) {
  //     fileReader = new FileReader();
  //     fileReader.onload = (e) => {
  //       const { result } = e.target;
  //       if (result && !isCancel) {
  //         setFileDataURL(result);
  //       }
  //     };
  //     fileReader.readAsDataURL(message.img);
  //   }
  //   return () => {
  //     isCancel = true;
  //     if (fileReader && fileReader.readyState === 1) {
  //       fileReader.abort();
  //     }
  //   };
  // }, [message.img]);

  return (
    <Wrapper>
      <div className={own ? "message own" : "message"}>
        <Top>
          <img src={PF + "/person/noAvatar.png"} alt="" className="iconImg" />
          <div className="h">
            <p>{message.text}</p>
            {message.img && <img src={PF + "/" + message.img} alt="" />}
            {/* {fileDataURL ? (
              <p className="img-preview-wrapper">
                {<img src={fileDataURL} alt="preview" />}
              </p>
            ) : null} */}
            {/* {message.img && (
              <Image filename={message.filename} blob={message.img} />
            )} */}
          </div>
        </Top>
        <Bottom>{format(message.createdAt)}</Bottom>
      </div>
    </Wrapper>
  );
}
const Wrapper = styled.div`
  .message {
    display: flex;
    flex-direction: column;
    margin-top: 20px;
  }
  .message.own {
    align-items: flex-end;
  }

  .message.own p {
    background-color: rgb(245, 241, 241);
    color: black;
  }
`;
const Top = styled.div`
  display: flex;
  .h {
    display: block;
    img {
      width: 200px;
      margin-top: 5px;
    }
  }
  .iconImg {
    width: 32px;
    height: 32px;
    margin-top: 10px;
    border-radius: 50%;
    object-fit: cover;
    margin-right: 10px;
  }
  span {
    padding: 10px;
    border-radius: 20px;
    background-color: #1877f2;
    color: white;
    max-width: 300px;
  }
`;
const Bottom = styled.div`
  font-size: 12px;
  margin-top: 5px;
`;
