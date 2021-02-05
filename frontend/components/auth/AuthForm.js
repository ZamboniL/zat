import styled from "styled-components";
import { MainButton } from "../common/MainButton";

export default function AuthForm({
  type,
  onSubmit,
  onPasswordChange,
  onEmailChange,
  onUsernameChange,
  emailError,
  usernameError,
  passwordError,
}) {
  return (
    <Form action="" onSubmit={onSubmit}>
      <FormTitle>{type}</FormTitle>
      <label htmlFor="email">
        email <Error>{emailError}</Error>
      </label>
      <Input
        error={emailError}
        type="email"
        name="email"
        id="email"
        onChange={onEmailChange}
        required
      />
      {type === "criar conta" && (
        <>
          <label htmlFor="username">
            username <Error>{usernameError}</Error>
          </label>
          <Input
            error={usernameError}
            type="text"
            name="username"
            id="username"
            onChange={onUsernameChange}
            required
          />
        </>
      )}
      <label htmlFor="password">
        password <Error>{passwordError}</Error>
      </label>
      <Input
        error={passwordError}
        type="password"
        name="password"
        id="password"
        onChange={onPasswordChange}
        required
      />
      <MainButton
        bgColor={"var(--complementary)"}
        hoverBgColor={"var(--complementary-shade)"}
        type="submit"
        value=""
      >
        {type}
      </MainButton>
    </Form>
  );
}

const Form = styled.form`
  display: flex;
  flex-direction: column;
  font-size: 1.5rem;
  background: white;
  color: var(--black);
  width: 100%;
  padding: 1.5rem;
  button {
    font-size: 1.5rem;
    margin: 1rem auto 0;
  }
  @media (min-width: 650px) {
    padding: 4rem;
    border-radius: 10px;

    width: 36rem;

    label {
      padding-bottom: 0.5rem;
    }
    button {
      font-size: 2rem;
      margin: 1rem auto 0;
    }
  }
`;
const Error = styled.span`
  color: var(--error);
  font-size: 0.5em;
  float: right;
`;

const Input = styled.input`
  font-size: 1rem;
  outline: none;
  border-radius: 5px;
  border: none;
  box-shadow: ${(props) =>
    props.error ? "inset 0 0 0 2px var(--error)" : "none"};
  transition: box-shadow 0.3s;
  background: var(--white);
  padding: 0.8rem;
  margin-bottom: 2rem;
`;

const FormTitle = styled.h1`
  font-size: 4rem;
  padding-bottom: 3rem;
  text-align: center;
`;
