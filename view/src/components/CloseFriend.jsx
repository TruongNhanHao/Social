import styled from "styled-components";

export default function CloseFriend({ user }) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  return (
    <C>
      <img src={PF + "/" + user.profilePicture} alt="" />
      <span>{user.username}</span>
    </C>
  );
}
const C = styled.li`
  display: flex;
  align-items: center;
  margin-bottom: 15px;
  img {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    object-fit: cover;
    margin-right: 10px;
  }
`;
