import styled from 'styled-components';

import { button } from '../../Button.style';
import { mainTheme } from '../../Themes';

const Delete = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 6.25rem;
`;

const H1 = styled.div`
  margin-top: 5rem;
  font-size: ${mainTheme['font-lg']};
  font-weight: 600;
`;

const H2 = styled.div`
  color: ${(props) => props.theme['color-dark-white']};
  margin-top: 0.5rem;
  font-size: ${mainTheme['font-sm']};
`;

const Submit = styled(button)`
  margin-top: 6.25rem;
`;

export const S = {
  Delete,
  H1,
  H2,
  Submit,
};
