import styled from 'styled-components';

import { mainTheme } from '@/styles/Themes';

const Footer = styled.footer`
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 13rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  background-color: ${(props) => props.theme['color-light-gray']};
`;

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  gap: 15%;
  justify-content: center;
  margin: 0 auto;
  margin-top: 2.5rem;
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Title = styled.p`
  text-align: center;
  font-size: ${mainTheme['font-md']};
  text-shadow: ${mainTheme['text-shadow']};
`;

const Link = styled.a`
  text-align: center;
  font-size: ${mainTheme['font-xs']};
  color: ${mainTheme['color-white']};
  text-decoration: none;
  text-shadow: ${mainTheme['text-shadow']};
  cursor: pointer;
`;

const P = styled.a`
  text-align: center;
  font-size: ${mainTheme['font-xs']};
  color: ${mainTheme['color-white']};
  text-shadow: ${mainTheme['text-shadow']};
  opacity: 50%;
  margin-bottom: 10px;
`;

export const S = { Footer, Wrapper, Column, Title, Link, P };
