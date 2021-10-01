import styled from 'styled-components';

import { mainTheme } from '@/styles/Themes';

const ArticleEditor = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const TextField = styled.div`
  width: 80vw;
  max-width: 60rem;
  padding: 1.875rem;
  margin-bottom: 600px;
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

export const S = {
  ArticleEditor,
  TextField,
  Form,
  ModalContent,
  Image,
};
