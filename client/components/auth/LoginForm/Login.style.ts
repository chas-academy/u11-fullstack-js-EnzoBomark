import { Form, Label, Input, Error, Submit } from '../../../styles/Form.style';
import styled from 'styled-components';

const P = styled.p`
  max-width: 25rem;
  width: 100%;
`;

const A = styled.a`
  display: flex;
  justify-content: flex-end;
  padding: 0 0.5rem;
  color: ${(props) => props.theme['color-dark-white']};
  font-size: ${(props) => props.theme['font-sm']};
  cursor: pointer;
`;

export const S = {
  Form,
  Label,
  Input,
  Error,
  Submit,
  P,
  A,
};
