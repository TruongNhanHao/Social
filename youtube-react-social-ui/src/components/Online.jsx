import styled from "styled-components";

export default function Online({ user }) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  // console.log(user);
  return (
    <Wrapper>
      <div>
        <img src={PF + user.profilePicture} alt="" />
        <span></span>
      </div>
      <span>{user.username}</span>
    </Wrapper>
  );
}
const Wrapper = styled.li`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  height: 60px;
  div {
    margin-right: 10px;
    position: relative;
    img {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      object-fit: cover;
    }
    span {
      width: 12px;
      height: 12px;
      border-radius: 50%;
      background-color: limegreen;
      position: absolute;
      top: 27px;
      right: 7px;
      border: 2px solid white;
    }
  }
  span {
    font-weight: 500;
  }
`;
