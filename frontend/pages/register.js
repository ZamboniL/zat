import AuthForm from "../components/AuthForm";
import styled from "styled-components";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";

export default function Login() {
  // user states and router
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("0");
  const router = useRouter();
  const [emailError, setEmailError] = useState(false);

  // get form values from child components AuthForm
  const handleEmailChange = (e) => setEmail(e.target.value);
  const handleUsernameChange = (e) => setUsername(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  // Get session from api and redirect user if everything is correct, else it displays a error for the user.
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isemail.validate(email)) {
      setEmailError(true);
      console.log("error");
      return;
    }
    axios
      .post("http://localhost:4000/api/auth/register", {
        email,
        username,
        password,
      })
      .then((response) => {
        console.log(response);
        if (response.status === 200) router.push("/");
      })
      .catch((err) => {
        console.log(err.response.data);
        setError(err.response.data);
      });
  };

  return (
    <>
      <LoginContainer>
        <AuthForm
          type="criar conta"
          onSubmit={handleSubmit}
          onEmailChange={handleEmailChange}
          onUsernameChange={handleUsernameChange}
          onPasswordChange={handlePasswordChange}
          emailError={emailError}
        />
        <BGSvg
          viewBox="0 0 641 1024"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M366.301 374C290.801 118.5 -160.699 325.5 62.3008 -48L895.801 -263V901C828.634 964.667 672.301 1089.8 584.301 1081C474.301 1070 516.801 973.5 616.301 844.5C715.801 715.5 441.801 629.5 366.301 374Z"
            fill="#E9EAEC"
            stroke="#E9EAEC"
          />
        </BGSvg>
        <Error error={error}>{error}</Error>
      </LoginContainer>
    </>
  );
}

const LoginContainer = styled.section`
  height: 100vh;
  background: var(--primary-color);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: left;
  position: relative;
`;

const BGSvg = styled.svg`
  position: absolute;
  right: 0;
  bottom: 0;
  height: 100%;
`;

const Error = styled.span`
  position: absolute;
  bottom: 15%;
  color: #fb8585;
  font-size: 1.2rem;
  opacity: ${(props) => props.error};
  transition: opacity 1s;
`;
