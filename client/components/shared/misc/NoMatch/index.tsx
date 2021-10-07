import { S } from './NoMatch.style';

interface Props {
  type: string;
}

const NoMatch: React.FC<Props> = (props: Props) => {
  return <S.NoMatch>No {props.type} matched your search</S.NoMatch>;
};

export default NoMatch;
