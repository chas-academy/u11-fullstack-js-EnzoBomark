import { S } from './FilterModal.style';
import ReactDom from 'react-dom';

interface Props {
  children: any;
  open: any;
  close: any;
}

const FilterModal: React.FC<Props> = (props: Props) => {
  if (!props.open) return null;

  return ReactDom.createPortal(
    <>
      <S.FilterModalBackground onClick={props.close} />
      <S.FilterModal>
        <S.CloseModal onClick={props.close}>Close</S.CloseModal>
        <S.ModalContent>{props.children}</S.ModalContent>
      </S.FilterModal>
    </>,
    document.getElementById('portal')
  );
};
export default FilterModal;
