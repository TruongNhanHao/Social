import { format } from "timeago.js";
import styled from "styled-components";

export default function Message({ message, own }) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  return (
    <Wrapper>
      <div className={own ? "message own" : "message"}>
        <Top>
          <img src={PF + "/person/noAvatar.png"} alt="" />
          <p>{message.text}</p>
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
  img {
    width: 32px;
    height: 32px;
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
  margin-top: 10px;
`;
