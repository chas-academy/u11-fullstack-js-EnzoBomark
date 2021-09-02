import styled from 'styled-components';
import { Label, Input, Error } from '@/styles/Input.style';
import { mainTheme } from '@/styles/Themes';

const VerifiedInput = styled(Input)<{ error: boolean }>`
  border: ${(props) => (!props.error ? mainTheme['border-sm'] : mainTheme['border-error'])};
`;

export const S = {
  Label,
  Input,
  Error,
};
