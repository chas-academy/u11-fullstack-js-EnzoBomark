import styled from 'styled-components';

import { mainTheme } from '@/styles/Themes';

const ArticleShowcase = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const TextField = styled.div`
  width: 93vw;
  max-width: 60rem;
  padding: 10px;
  margin-bottom: 1.875rem;
`;

const Title = styled.h1`
  margin-top: 1.875rem;
`;

const Info = styled.div`
  margin-top: 0.625rem;
  display: flex;
`;

const P = styled.p`
  opacity: 0.7;
  margin: 0 0.3125rem;
`;

const Image = styled.img`
  margin: 1.875rem 0 0.625rem 0;
  width: 91vw;
  max-width: 60rem;
  border-radius: ${mainTheme['rounded-md']};
  box-shadow: ${mainTheme['box-shadow']};
`;

export const S = {
  ArticleShowcase,
  TextField,
  Title,
  Info,
  P,
  Image,
};
