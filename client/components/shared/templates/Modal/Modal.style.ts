import { mainTheme } from '@/styles/Themes';
import styled from 'styled-components';

const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 1000;
  cursor: pointer;
`;

const Modal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: ${mainTheme['color-dark-gray']};
  border-radius: ${mainTheme['rounded-md']};
  border: ${mainTheme['border-sm']};
  width: 90%;
  max-width: 30rem;
  min-height: 30rem;
  z-index: 1000;
  padding: 2.5rem 0 3.75rem 0;
`;

const CloseModal = styled.div`
  display: flex;
  justify-content: flex-end;
  margin: 0 auto 1.875rem auto;
  width: 70%;
  font-size: ${mainTheme['font-sm']};
  cursor: pointer;
`;

const ModalContent = styled.div``;

export const S = {
  ModalBackground,
  Modal,
  CloseModal,
  ModalContent,
};
