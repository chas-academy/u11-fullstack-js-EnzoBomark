import styled from 'styled-components';
import { text_area, input_error, input_label } from '@/styles/Input.style';
import { mainTheme } from '@/styles/Themes';

const TextArea = styled(text_area)<{ error: string }>`
  border: ${(props) => (!props.error ? mainTheme['border-sm'] : mainTheme['border-error'])};
`;

const Label = styled(input_label)``;

const Error = styled(input_error)``;

export const S = { Label, TextArea, Error };
