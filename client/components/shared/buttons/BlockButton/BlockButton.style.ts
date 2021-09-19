import styled from 'styled-components';
import { RichButton } from '@/styles/Button.style';

const BlockButton = styled(RichButton)<{ active: boolean }>`
  opacity: ${(props) => (props.active ? '100%' : '50%')};
`;

export const S = {
  BlockButton,
};
