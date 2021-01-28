import AuthForm from "../components/AuthForm";
import styled from "styled-components";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";

export default function Login() {
  // user states and router
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const router = useRouter();

  // error handling states
  const [emailError, setEmailError] = useState("");
  const [senhaError, setSenhaError] = useState("");

  // get form values from child components AuthForm
  const handleEmailChange = (e) => setEmail(e.target.value);
  const handleSenhaChange = (e) => setSenha(e.target.value);

  // Get session from api and redirect user if everything is correct, else it displays a error for the user.
  const handleSubmit = async (e) => {
    e.preventDefault();
    axios.defaults.withCredentials = true;
    await axios
      .post("http://localhost:4000/api/auth/login", {
          email,
          senha,

        withCredentials: true,
      })
      .then((response) => {
        console.log(response);
        if (response.status === 200) router.push("/user");
      })
      .catch((err) => {
        // Send the error message to the child node
        setEmailError(err.response.data);
        setSenhaError(true);
      });
  };

  return (
    <>
      <LoginContainer>
        <AuthForm
          type="login"
          onSubmit={handleSubmit}
          onEmailChange={handleEmailChange}
          onSenhaChange={handleSenhaChange}
          emailError={emailError}
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
  position: relative;
`;
