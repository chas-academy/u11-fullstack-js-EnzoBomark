import styled from 'styled-components';
import { Label, Input } from '@/styles/Input.style';
import { mainTheme } from '@/styles/Themes';
import { Button } from '@/styles/Button.style';

const TagsInput = styled(Input)``;

const AddTag = styled(Button)`
  margin-top: 1.875rem;
  margin-left: 20px;
  width: 5rem;
`;

const Wrapper = styled.div`
  display: flex;
  width: 100%;
`;

const Tags = styled.div`
  margin-top: 20px;
  display: grid;
  grid-template-columns: repeat(3, 1fr); /* 3 columns */
  grid-template-rows: repeat(3); /* 3 rows  */
  grid-gap: 10px 10px;
  width: 100%;
`;

const Tag = styled.p`
  text-align: center;
  padding: 5px;
  width: 90%;
  margin: auto;
  border-radius: ${mainTheme['rounded-md']};
  border: ${mainTheme['border-sm']};
  background-color: ${(props) => props.theme['color-light-gray']};
  font-size: ${mainTheme['font-sm']};
`;

const Error = styled.p`
  font-size: ${mainTheme['font-sm']};
  margin-top: 1.25rem;
`;

export const S = {
  Label,
  TagsInput,
  AddTag,
  Wrapper,
  Tags,
  Tag,
  Error,
};
