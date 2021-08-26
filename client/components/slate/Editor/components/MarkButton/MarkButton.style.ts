import styled from 'styled-components';

const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 25px;
  width: 25px;
  border-radius: 5px;
  background-color: #2f363d;
  margin: 0 10px;
  border: none;

  & :first-child {
    margin-left: 15px;
  }
`;

export const S = {
  Button,
};
