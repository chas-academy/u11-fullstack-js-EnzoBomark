import styled from 'styled-components';

import { input } from '@/styles/Input.style';

const Search = styled.div`
  margin: 0 auto;
  width: 100%;
  max-width: 100rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 6.25rem;
`;

const Searchbar = styled(input)`
  width: 90%;
  max-width: 90rem;
`;

export const S = {
  Search,
  Searchbar,
};
