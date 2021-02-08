import AuthForm from "../components/auth/AuthForm";
import styled from "styled-components";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { setCookie } from "nookies";
import checkRegisterConditions from "../lib/checkRegisterConditions";
import LayoutAuthForm from "../components/auth/LayoutAuthForm";

export default function Login() {
  // user states and router
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  // error handling states
  const [emailError, setEmailError] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  // get form values from child components AuthForm
  const handleEmailChange = (e) => setEmail(e.target.value);
  const handleUsernameChange = (e) => setUsername(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  // Get session from api and redirect user if everything is correct, else it displays a error for the user.
  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = checkRegisterConditions(email, username, password);
    if (errs) {
      setEmailError("");
      setPasswordError("");
      setUsernameError("");
      if (errs.includes("Email")) setEmailError(errs);
      if (errs.includes("Senha")) setPasswordError(errs);
      if (errs.includes("Username")) setUsernameError(errs);
    }
    axios
      .post(`${process.env.SERVER_URL}api/auth/register`, {
        email,
        username,
        password,
      })
      .then((res) => {
        // set auth cookie on user
        if (res.status === 200) {
          setCookie(null, "token", res.data.token, {
            path: "/",
            maxAge: 3600 * 24,
            sameSite: true,
          });
          router.push("/user");
        }
      })
      .catch((err) => {
        console.log(err.response);
        const errMessage = err.response.data.msg;
        if (errMessage) {
          if (errMessage.includes("Email"))
            setEmailError(err.response.data.msg);
        }
      });
  };

  return (
    <LayoutAuthForm type={"Registrar"}>
      <AuthForm
        type="criar conta"
        onSubmit={handleSubmit}
        onEmailChange={handleEmailChange}
        onUsernameChange={handleUsernameChange}
        onPasswordChange={handlePasswordChange}
        emailError={emailError}
        usernameError={usernameError}
        passwordError={passwordError}
      />
    </LayoutAuthForm>
  );
}
