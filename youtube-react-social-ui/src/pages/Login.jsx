import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import styled from "styled-components";
import { loginUser } from "../context/apiCalls";

export default function Login() {
  const email = useRef();
  const password = useRef();
  const dispatch = useDispatch();
  const history = useHistory();
  const { isLoggedIn, currentUser } = useSelector((state) => state.user);
  console.log(isLoggedIn);
  const handleClick = (e) => {
    e.preventDefault();
    loginUser(
      { email: email.current.value, password: password.current.value },
      dispatch
    );
  };
  if (currentUser) {
    history.push("/");
  }
  return (
    <C>
      <Wrapper>
        <div className="loginLeft">
          <h3>Lamasocial</h3>
          <span>
            Connect with friends and the world around you on Lamasocial.
          </span>
        </div>
        <div className="loginRight">
          <Box>
            <input placeholder="Email" ref={email} />
            <input placeholder="Password" ref={password} />
            <button
              className="loginButton"
              disabled={isLoggedIn}
              onClick={handleClick}
            >
              Log In
            </button>
            <span className="loginForgot">Forgot Password?</span>
            <Link to="register">
              <button className="loginRegisterButton">
                Create a New Account
              </button>
            </Link>
          </Box>
        </div>
      </Wrapper>
    </C>
  );
}
const C = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: #f0f2f5;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Wrapper = styled.div`
  width: 70%;
  height: 70%;
  display: flex;
  .loginLeft,
  .loginRight {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  .loginLeft {
    h3 {
      font-size: 50px;
      font-weight: 800;
      color: #1775ee;
      margin-bottom: 10px;
    }
    span {
      font-size: 24px;
    }
  }
`;
const Box = styled.div`
  height: 300px;
  padding: 20px;
  background-color: white;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  input {
    height: 50px;
    border-radius: 10px;
    border: 1px solid gray;
    font-size: 18px;
    padding-left: 20px;
  }
  input:focus {
    outline: none;
  }
  .loginButton {
    height: 50px;
    border-radius: 10px;
    border: none;
    background-color: #1775ee;
    color: white;
    font-size: 20px;
    font-weight: 500;
    cursor: pointer;
  }

  .loginForgot {
    text-align: center;
    color: #1775ee;
  }

  .loginRegisterButton {
    width: 60%;
    margin: 0 100px;
    align-self: center;
    height: 50px;
    border-radius: 10px;
    border: none;
    background-color: #42b72a;
    color: white;
    font-size: 20px;
    font-weight: 500;
    cursor: pointer;
  }
`;
