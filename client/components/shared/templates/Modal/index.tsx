import ReactDom from 'react-dom';

import { S } from './Modal.style';

interface Props {
  children: any;
  open: any;
  close: any;
}

const Modal: React.FC<Props> = (props: Props) => {
  if (!props.open) return null;

  return ReactDom.createPortal(
    <>
      <S.ModalBackground onClick={props.close} />
      <S.Modal>
        <S.CloseModal onClick={props.close}>Close</S.CloseModal>
        <S.ModalContent>{props.children}</S.ModalContent>
      </S.Modal>
    </>,
    document.getElementById('portal')
  );
};
export default Modal;
