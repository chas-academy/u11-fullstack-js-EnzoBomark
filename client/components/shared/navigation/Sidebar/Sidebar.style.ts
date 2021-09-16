import { mainTheme } from '@/styles/Themes';
import styled from 'styled-components';

const SidebarBackground = styled.aside<{ isOpen: boolean }>`
  position: fixed;
  z-index: 1000;
  width: 100%;
  height: 100%;
  background-color: ${mainTheme['color-black']};
  transition: 0.3s ease-in-out;
  pointer-events: ${(props) => (props.isOpen ? 'all' : 'none')};
  opacity: ${(props) => (props.isOpen ? '40%' : '0')};
  cursor: pointer;

  @media screen and (min-width: 768px) {
    display: none;
  }
`;

const Sidebar = styled.aside<{ isOpen: boolean }>`
  position: fixed;
  z-index: 1000;
  width: 70%;
  height: 100%;
  background-color: ${mainTheme['color-light-gray']};
  display: grid;
  align-items: center;
  transition: 0.3s ease-in-out;
  top: 0;
  left: ${(props) => (props.isOpen ? '30%' : '100%')};
  opacity: ${(props) => (props.isOpen ? '100%' : '0')};

  @media screen and (min-width: 768px) {
    display: none;
  }
`;

const SidebarBtn = styled.button`
  position: absolute;
  top: 1.2rem;
  right: 1.5rem;
  background-color: transparent;
  outline: none;
  border: none;
  cursor: pointer;
  color: ${(props) => props.theme['color-white']};
  font-size: ${mainTheme['font-sm']};
`;

const SidebarMenu = styled.div`
  height: 70vh;
  max-height: 30rem;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
`;

export const S = {
  SidebarBackground,
  Sidebar,
  SidebarBtn,
  SidebarMenu,
};
