import { mainTheme } from '@/styles/Themes';
import styled from 'styled-components';

const ArticleFilter = styled.div`
  text-shadow: ${mainTheme['text-shadow']};
`;

const FilterButton = styled.div`
  font-size: ${mainTheme['font-sm']};
`;
const FilterContent = styled.div``;

export const S = {
  ArticleFilter,
  FilterButton,
  FilterContent,
};
