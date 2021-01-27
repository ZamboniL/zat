import styled from "styled-components";

const FormLayout = styled.form`
  display: flex;
  flex-direction: column;
  font-size: 1.5rem;
  color: var(--white);
  width: 36rem;

  & label {
    padding-bottom: 0.5rem;
  }
`;

const Input = styled.input`
  font-size: 1rem;
  outline: none;
  border-radius: 5px;
  border: ${(props) => (props.error ? "2px red solid" : "none")};
  background: var(--white);
  padding: 0.8rem;
  margin-bottom: 2rem;
`;

const Submit = styled.button`
  background: var(--secondary-color);
  color: var(--white);
  font-size: 1.5rem;
  font-weight: bold;
  font-family: inherit;
  outline: none;
  border: none;
  border-radius: 15px;
  padding: 1rem;
  margin: 2rem auto 0 auto;
  width: 30%;
  cursor: pointer;
  transition: 0.2s;
  &:hover {
    width: 35%;
  }
`;

const FormTitle = styled.h1`
  font-size: 4rem;
  color: var(--white);
  padding-bottom: 3rem;
`;

export default function AuthForm({
  type,
  onSubmit,
  onPasswordChange,
  onEmailChange,
  onUsernameChange,
  errorEmail,
  errorUsername,
  errorPassword,
}) {
  return (
    <FormLayout action="" onSubmit={onSubmit}>
      <FormTitle>{type}</FormTitle>
      <label htmlFor="email">email</label>
      <Input
        error={errorEmail}
        type="email"
        name="email"
        id="email"
        onChange={onEmailChange}
        required
      />
      {type === "criar conta" && (
        <>
          <label htmlFor="username">username</label>
          <Input
            error={errorUsername}
            type="text"
            name="username"
            id="username"
            onChange={onUsernameChange}
            required
          />
        </>
      )}
      <label htmlFor="password">senha</label>
      <Input
        error={errorPassword}
        type="password"
        name="password"
        id="password"
        onChange={onPasswordChange}
        required
      />
      <Submit type="submit" value="">
        {type}
      </Submit>
    </FormLayout>
  );
}
