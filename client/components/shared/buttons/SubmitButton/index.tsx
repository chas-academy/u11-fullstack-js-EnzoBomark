import { S } from './SubmitButton.style';

interface Props {
  children: string;
}

const SubmitButton: React.FC<Props> = (props: Props) => {
  return <S.SubmitButton>{props.children}</S.SubmitButton>;
};

export default SubmitButton;
