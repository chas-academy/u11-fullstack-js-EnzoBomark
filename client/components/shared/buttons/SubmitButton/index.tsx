import { S } from './SubmitButton.style';

interface Props {
  onClick?: (e) => void;
  children: string | string[];
}

const SubmitButton: React.FC<Props> = (props: Props) => {
  return <S.SubmitButton onClick={props.onClick}>{props.children}</S.SubmitButton>;
};

export default SubmitButton;
