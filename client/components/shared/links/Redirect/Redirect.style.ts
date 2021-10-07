import styled from 'styled-components';
import link from 'next/link';
import { mainTheme } from '@/styles/Themes';
import { button } from '@/styles/Button.style';

const Button = styled(button)`
  margin-top: 30px;
`;

const Link = styled(link)``;

export const S = {
  Button,
  Link,
};
