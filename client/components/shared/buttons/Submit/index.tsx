import { S } from './Submit.style';

interface Props {
  children: string;
}

const Submit: React.FC<Props> = (props: Props) => {
  return <S.Submit>{props.children}</S.Submit>;
};

export default Submit;
