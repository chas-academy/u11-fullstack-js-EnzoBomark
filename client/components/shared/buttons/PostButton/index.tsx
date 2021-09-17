import { S } from './PostButton.style';

interface Props {
  open: () => void;
}

const PostButton: React.FC<Props> = (props: Props) => {
  return (
    <S.PostButton type="button" onClick={props.open}>
      Post
    </S.PostButton>
  );
};

export default PostButton;
