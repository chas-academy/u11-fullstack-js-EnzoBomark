import styled from 'styled-components';
import { mainTheme } from '@/styles/Themes';

const Navbar = styled.header`
  background-color: ${(props) => props.theme['color-light-gray']};
  height: 3.125rem;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: ${mainTheme['font-sm']};
  position: sticky;
  top: 0;
  z-index: 999;

  @media screen and (max-width: 960px) {
    transition: 0.5s all ease;
  }
`;

const Nav = styled.div`
  display: flex;
  justify-content: center;
  height: 3.125rem;
  z-index: 100;
  width: 100%;
  padding: 0 1.25rem;
  max-width: 70rem;

  @media screen and (max-width: 768px) {
    justify-content: flex-end;
    align-items: center;
  }
`;

const NavBtn = styled.div`
  display: none;

  @media screen and (max-width: 768px) {
    display: block;
    font-size: ${mainTheme['font-sm']};
    cursor: pointer;
  }
`;

const NavMenu = styled.div`
  display: flex;
  align-items: center;
  list-style: none;
  text-align: center;

  @media screen and (max-width: 768px) {
    display: none;
  }
`;

export const S = {
  Navbar,
  NavBtn,
  Nav,
  NavMenu,
};
