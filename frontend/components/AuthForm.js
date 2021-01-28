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
const Error = styled.span`
  color: var(--error);
  font-size: 0.8em;
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
  text-align: center;
`;

export default function AuthForm({
  type,
  onSubmit,
  onSenhaChange,
  onEmailChange,
  onUsernameChange,
  emailError,
  usernameError,
  senhaError,
}) {
  return (
    <FormLayout action="" onSubmit={onSubmit}>
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
      <label htmlFor="senha">
        senha <Error>{senhaError}</Error>
      </label>
      <Input
        error={senhaError}
        type="password"
        name="senha"
        id="senha"
        onChange={onSenhaChange}
        required
      />
      <Submit type="submit" value="">
        {type}
      </Submit>
    </FormLayout>
  );
}
