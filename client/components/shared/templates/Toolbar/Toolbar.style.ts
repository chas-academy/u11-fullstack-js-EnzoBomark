import styled from 'styled-components';

const Toolbar = styled.div`
  z-index: 900;
  position: sticky;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 3.125rem;
  background-color: ${(props) => props.theme['color-dark-gray']};
`;

export const S = {
  Toolbar,
};
