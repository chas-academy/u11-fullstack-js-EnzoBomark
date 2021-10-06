import styled from 'styled-components';

import { mainTheme } from '@/styles/Themes';

const ArticleEditor = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const TextField = styled.div`
  width: 93vw;
  max-width: 60rem;
  padding: 1.875rem;
`;

const Form = styled.form`
  margin-top: 1.875rem;
  display: flex;
  max-width: 60rem;
  width: 85%;
`;

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 25rem;
  width: 75%;
  margin: auto;
`;

const Image = styled.img`
  margin: 1.875rem 0 0.625rem 0;
  width: 91vw;
  max-width: 60rem;
  border-radius: ${mainTheme['rounded-md']};
  box-shadow: ${mainTheme['box-shadow']};
`;

const Submit = styled.button`
  position: absolute;
  bottom: 14.375rem;
  right: 1.25rem;
  font-size: ${mainTheme['font-xs']};
  font-weight: 100;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50px;
  height: 50px;
  background-color: ${(props) => props.theme['color-dark-gray']};
  border: ${(props) => props.theme['border-sm']};
  color: ${(props) => props.theme['color-white']};
  border-radius: ${mainTheme['rounded-lg']};
  text-shadow: ${mainTheme['text-shadow']};
  box-shadow: ${mainTheme['box-shadow']};
  cursor: pointer;
`;

export const S = {
  ArticleEditor,
  TextField,
  Form,
  ModalContent,
  Image,
  Submit,
};
