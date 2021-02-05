import AuthForm from "../components/auth/AuthForm";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { setCookie } from "nookies";
import LayoutAuthForm from "../components/auth/LayoutAuthForm";

export default function Login() {
  // user states and router
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  // error handling states
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  // get form values from child components AuthForm
  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  // Get session from api and redirect user if everything is correct, else it displays a error for the user.
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:4000/api/auth/login", {
        email,
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
        // Send the error message to the child node
        setEmailError("");
        setPasswordError("");
        if (err.response) {
          if (err.response.data.msg.includes("email"))
            setEmailError(err.response.data.msg);
          if (err.response.data.msg.includes("Senha"))
            setPasswordError(err.response.data.msg);
        }
      });
  };

  return (
    <>
      <LayoutAuthForm type={"Login"}>
        <AuthForm
          type="login"
          onSubmit={handleSubmit}
          onEmailChange={handleEmailChange}
          onPasswordChange={handlePasswordChange}
          emailError={emailError}
          passwordError={passwordError}
        />
      </LayoutAuthForm>
    </>
  );
}
