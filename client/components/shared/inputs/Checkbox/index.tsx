import { S } from './Checkbox.style';

interface Props {
  value: boolean;
  children: string;
  onClick: () => void;
}

const Checkbox: React.FC<Props> = (props: Props) => {
  return (
    <S.Wrapper>
      {props.children}
      <S.Checkbox active={props.value} onClick={() => props.onClick()} />
    </S.Wrapper>
  );
};

export default Checkbox;
