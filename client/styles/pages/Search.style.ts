import { input } from '@/styles/Input.style';
import styled from 'styled-components';

const Search = styled.div`
  margin: 0 auto;
  width: 100%;
  max-width: 100rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Searchbar = styled(input)`
  width: 90%;
  max-width: 90rem;
`;

export const S = {
  Search,
  Searchbar,
};
