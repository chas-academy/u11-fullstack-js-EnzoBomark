import { S } from './ListHeader.style';

interface Props {
  children: string;
}

const ListHeader: React.FC = (props: Props) => {
  return <S.ListHeader>{props.children}</S.ListHeader>;
};

export default ListHeader;
