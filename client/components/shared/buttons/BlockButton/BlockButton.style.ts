import styled from 'styled-components';
import { rich_button } from '@/styles/Button.style';

const BlockButton = styled(rich_button)<{ active: boolean }>`
  opacity: ${(props) => (props.active ? '100%' : '50%')};
`;

export const S = {
  BlockButton,
};
