import styled from 'styled-components';
import { Button } from '@/styles/Button.style';
import { mainTheme } from '@/styles/Themes';

const Post = styled(Button)`
  min-width: 3.9rem;
  height: 3.9rem;
  width: 3.9rem;
  border-radius: ${mainTheme['rounded-sm']};
  margin: 0 0.625rem;
`;

export const S = {
  Post,
};
