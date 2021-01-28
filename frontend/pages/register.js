import AuthForm from "../components/AuthForm";
import styled from "styled-components";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";

export default function Login() {
  // user states and router
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const router = useRouter();

  // error handling states
  const [emailError, setEmailError] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [senhaError, setSenhaError] = useState("");

  // get form values from child components AuthForm
  const handleEmailChange = (e) => setEmail(e.target.value);
  const handleUsernameChange = (e) => setUsername(e.target.value);
  const handleSenhaChange = (e) => setSenha(e.target.value);

  // Get session from api and redirect user if everything is correct, else it displays a error for the user.
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:4000/api/auth/register", {
        email,
        username,
        senha,
      })
      .then((response) => {
        console.log(response);
        if (response.status === 200) router.push("/user");
      })
      .catch((err) => {
        const errors = err.response.data;

        // Send the error messages to the child node
        setEmailError(
          errors.find((error) => error.includes("email")).replace(":", "")
        );
        setUsernameError(
          errors.find((error) => error.includes("username")).replace(":", "")
        );
        setSenhaError(
          errors.find((error) => error.includes("senha")).replace(":", "")
        );
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
          onSenhaChange={handleSenhaChange}
          emailError={emailError}
          usernameError={usernameError}
          senhaError={senhaError}
        />
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
