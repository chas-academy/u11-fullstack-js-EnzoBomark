import styled, { css } from 'styled-components';

import { mainTheme } from '@/styles/Themes';

const Popup = styled.div``;

const Link = styled.div`
  display: inline;
  position: relative;

  a {
    color: lightskyblue;
    text-decoration: none;
  }

  ${Popup} {
    position: absolute;
    left: 0;
    display: flex;
    align-items: center;
    background-color: ${mainTheme['color-dark-gray']};
    padding: 6px 10px;
    gap: 10px;
    border-radius: 6px;
    border: ${mainTheme['border-sm']};
  }

  ${Popup} a {
    display: flex;
    align-items: center;
    gap: 5px;
    padding-right: 10px;
    color: lightskyblue;
    text-decoration: underline;
    border-right: 1px solid lightgrey;
  }

  ${Popup} button {
    border: none;
    background: transparent;
    color: white;
  }

  ${Popup} button:hover {
    color: rebeccapurple;
    cursor: pointer;
  }
`;

export const S = {
  Link,
  Popup,
};
