import styled from 'styled-components';
import { input } from '../Input.style';

const Admin = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Searchbar = styled(input)`
  width: 90%;
  max-width: 90rem;
`;

export const S = { Admin, Searchbar };
