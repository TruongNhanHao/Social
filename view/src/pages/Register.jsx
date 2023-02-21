import axios from "axios";
import { useRef } from "react";
import { Link, useHistory } from "react-router-dom";
import styled from "styled-components";
export default function Register() {
  const username = useRef();
  const email = useRef();
  const password = useRef();
  const passwordAgain = useRef();
  const form = useRef();
  const history = useHistory();

  const handleClick = async (e) => {
    e.preventDefault();
    if (passwordAgain.current.value !== password.current.value) {
      passwordAgain.current.setCustomValidity("Passwords don't match!");
    } else {
      const user = {
        username: username.current.value,
        email: email.current.value,
        password: password.current.value,
      };
      try {
        const res = await axios.post("/auth/register", user);
        if (res) {
          await axios.post("/notify", { userId: res._id });
          // emailjs
          //   .sendForm(
          //     "service_hc0p87b",
          //     "template_jhu2865",
          //     form.current,
          //     "LzM6N_dG4m4tDzMOk"
          //   )
          //   .then(
          //     (result) => {
          //       console.log(result.text);
          //     },
          //     (error) => {
          //       console.log(error.text);
          //     }
          //   );
          history.push("/login");
        }
      } catch (err) {
        console.log(err);
      }
    }
    console.log(form);
  };
  return (
    <C>
      <Wrapper>
        <div className="loginLeft">
          <h3>Facebook</h3>
          <span>
            Connect with friends and the world around you on Facebook.
          </span>
        </div>
        <div className="loginRight">
          <Box ref={form} onSubmit={handleClick}>
            <input placeholder="Username" ref={username} name="user_name" />
            <input placeholder="Email" ref={email} name="user_email" />
            <input placeholder="Password" ref={password} />
            <input placeholder="Password Again" ref={passwordAgain} />
            <button className="loginButton" type="submit">
              Sign Up
            </button>
            <Link to="/login">
              <button className="loginRegisterButton">
                Đăng nhập vào tài khoản
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
const Box = styled.form`
  padding: 20px;
  background-color: white;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  input {
    height: 50px;
    margin: 15px 0;
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
    align-self: center;
    margin-top: 20px;
    margin-left: 100px;
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
