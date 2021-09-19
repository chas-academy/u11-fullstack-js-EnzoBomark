import styled from 'styled-components';
import { mainTheme } from '@/styles/Themes';

const PageHeader = styled.div`
  margin-top: 1.25rem;
  width: 90%;
  padding: 0 1.25rem;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
`;

const Title = styled.div`
  font-size: ${mainTheme['font-xl']};
  font-weight: 500;
`;

export const S = {
  PageHeader,
  Title,
};
