import styled from 'styled-components';

const Header = styled.header`
  display: flex;
  justify-content: center;
  height: 3.125rem;
  background-color: ${(props) => props.theme['color-light-gray']};
`;

export const S = {
  Header,
};
