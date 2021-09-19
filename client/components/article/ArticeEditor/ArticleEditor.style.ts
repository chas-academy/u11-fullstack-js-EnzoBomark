import styled from 'styled-components';

const ArticleEditor = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const TextField = styled.div`
  width: 80vw;
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

export const S = {
  ArticleEditor,
  TextField,
  Form,
  ModalContent,
};
