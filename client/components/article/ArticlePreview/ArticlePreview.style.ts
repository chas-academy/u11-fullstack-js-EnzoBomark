import styled from 'styled-components';

import { mainTheme } from '@/styles/Themes';

const ArticlePreview = styled.div`
  width: 90vw;
  max-width: 88rem;
  display: flex;
  cursor: pointer;
  margin-top: 1.25rem;
`;

const Image = styled.img`
  height: 100px;
  width: 30%;
  max-width: 180px;
  min-width: 100px;
  object-fit: cover;
  border-radius: ${mainTheme['rounded-md']};
  box-shadow: ${mainTheme['box-shadow']};
`;

const Text = styled.div`
  height: 100px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  margin-left: 0.9375rem;
  text-shadow: ${mainTheme['text-shadow']};
`;

const Title = styled.h2`
  font-size: ${mainTheme['font-md']};
`;

const Span = styled.span`
  display: flex;
`;

const About = styled.p`
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  font-size: ${mainTheme['font-sm']};
  opacity: 70%;
  max-height: 2.1875rem;
  width: 100%;
  max-width: 80rem;
`;

const Data = styled.p`
  margin-right: 5px;
  font-size: ${mainTheme['font-xs']};
`;

const Tags = styled.span`
  margin-right: 5px;
  opacity: 50%;
  font-size: ${mainTheme['font-xs']};
`;

export const S = {
  ArticlePreview,
  Image,
  Text,
  Title,
  Span,
  About,
  Tags,
  Data,
};
