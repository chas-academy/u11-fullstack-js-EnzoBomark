import styled from 'styled-components';
import { Label, Input, Error } from '@/styles/Input.style';
import { mainTheme } from '@/styles/Themes';

const VerifiedInput = styled(Input)<{ error: string }>`
  border: ${(props) => (!props.error.length ? mainTheme['border-sm'] : mainTheme['border-error'])};
`;

export const S = {
  Label,
  VerifiedInput,
  Error,
};
