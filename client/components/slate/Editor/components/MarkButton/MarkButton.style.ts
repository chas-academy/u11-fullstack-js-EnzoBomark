import styled from 'styled-components';

const Button = styled.button`
  height: 25px;
  width: 25px;
  border-radius: 5px;
  background-color: #2f363d;
  margin: 0 10px;
  border: none;
  cursor: pointer;

  & :first-child {
    margin-left: 15px;
  }
`;

const IconInActive = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 50%;
`;
const IconActive = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 100%;
`;

export const S = {
  Button,
  IconInActive,
  IconActive,
};
