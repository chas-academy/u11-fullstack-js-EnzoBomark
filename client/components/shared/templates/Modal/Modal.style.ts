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
  padding: 1.25rem 1.5rem;
  width: 90%;
  max-width: 30rem;
  min-height: 30rem;
  z-index: 1000;
`;

const CloseModal = styled.div`
  float: right;
  padding: 0.5rem;
  font-size: ${mainTheme['font-sm']};
  background-color: ${mainTheme['color-black']};
  border-radius: ${mainTheme['rounded-md']};
  cursor: pointer;
`;

const ModalContent = styled.div``;

export const S = {
  ModalBackground,
  Modal,
  CloseModal,
  ModalContent,
};
