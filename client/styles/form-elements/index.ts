import styled from 'styled-components';

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;

  & .error {
    border: 1px solid #e93e36;
  }
`;

const Label = styled.label`
  border: 0;
  clip: rect(0 0 0 0);
  height: 0.0625rem;
  margin: -0.0625rem;
  overflow: hidden;
  padding: 0;
  position: absolute;
  width: 0.0625rem;
`;

const Input = styled.input`
  position: relative;
  display: flex;
  background: #2f363d;
  color: #ffffff;
  height: 3.75rem;
  width: 75%;
  max-width: 25rem;
  border: solid 0.0625rem #ffffff2f;
  border-radius: 1.0625rem;
  font-size: 0.875rem;
  font-weight: 400;
  cursor: text;
  margin-top: 1.875rem;
  padding: 0 1.25rem;
  box-shadow: 0px 6px 15px -2px rgba(0, 0, 0, 0.2);
  text-shadow: 0px 2px 5px rgba(0, 0, 0, 0.27);

  &:hover {
    border: solid 1px #bdbdbd;
  }

  &:focus {
    outline: none;
  }
`;

const Error = styled.span`
  color: #e93e36;
  margin-top: 1rem;
  text-align: center;
  width: 70%;
  text-shadow: 0px 2px 5px rgba(0, 0, 0, 0.27);
`;

const Submit = styled.button`
  background: #2f363d;
  color: #ffffff;
  width: 75%;
  height: 3.75rem;
  max-width: 20rem;
  margin: 1.875rem 0;
  border: none;
  border-radius: 1.0625rem;
  box-shadow: 0px 6px 15px -2px rgba(0, 0, 0, 0.2);
  text-shadow: 0px 2px 5px rgba(0, 0, 0, 0.27);
`;

export const S = {
  Form,
  Label,
  Input,
  Error,
  Submit,
};
