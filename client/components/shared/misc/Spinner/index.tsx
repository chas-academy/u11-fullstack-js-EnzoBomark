import { S } from './Spinner.style';

interface Props {
  isLoading: boolean;
}

const Spinner: React.FC<Props> = (props: Props) => {
  return (
    <S.Progress isLoading={props.isLoading}>
      <S.Bar />
    </S.Progress>
  );
};

export default Spinner;
