import { S } from './Redirect.style';

interface Props {
  children: string;
  href: string;
}

const Redirect: React.FC<Props> = (props: Props) => {
  return (
    <S.Link href={props.href}>
      <S.Button>{props.children}</S.Button>
    </S.Link>
  );
};

export default Redirect;
