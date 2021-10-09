import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';

import useFetch from '@/hooks/useFetch.hooks';
import useToggle from '@/hooks/useToggle.hooks';
import { Response } from '@/interfaces/Response.interface';
import { RootState } from '@/store/index';
import { post } from '@/utils/http.utils';

import { S } from './SaveButton.style';

interface Props {
  isSaved: boolean;
}

const SaveButton: React.FC<Props> = (props: Props) => {
  const router = useRouter();
  const user = useSelector((state: RootState) => state.user.user);
  const [isLiked, setIsLiked] = useToggle(props.isSaved);

  const { fetch } = useFetch<Response>(() => post(`user/save/${router.query.articleId}`));

  const LikeHandler = async () => {
    await fetch();
    setIsLiked();
  };

  return (
    <S.SaveButton>
      {user && <S.Button onClick={LikeHandler}>{isLiked ? <p>Saved</p> : <p>Save</p>}</S.Button>}
    </S.SaveButton>
  );
};

export default SaveButton;
