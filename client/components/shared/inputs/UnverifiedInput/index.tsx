import { S } from './UnverifiedInput.style';

interface Props {
  placeholder: string;
}

const UnverifiedInput: React.FC<Props> = (props: Props) => {
  return <S.UnverifiedInput placeholder={props.placeholder} />;
};

export default UnverifiedInput;
