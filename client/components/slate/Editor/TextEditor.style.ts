import styled from 'styled-components';

const Editor = styled.div`
  background-color: #2f363d;
  height: auto;
  min-height: 85vh;
  width: 90%;
  max-width: 65rem;
  margin: 1.25rem auto 3.75rem auto;
  border: solid 0.0625rem #ffffff2f;
  border-radius: 1.0625rem;
`;

const TextField = styled.div`
  height: 90%;
  margin: 1.25rem;
`;

export const S = {
  Editor,
  TextField,
};
