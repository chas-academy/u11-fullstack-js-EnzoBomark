import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import { useFetch } from '@/hooks/useFetch.hooks';
import { useToggle } from '@/hooks/useToggle.hooks';
import { Response } from '@/interfaces/Response.interface';
import { RootState } from '@/store/index';
import { post } from '@/utils/http.utils';

import { S } from './LikeButton.style';

interface Props {
  likes: number;
  userLikes: string[];
}

const LikeButton: React.FC<Props> = (props: Props) => {
  const router = useRouter();
  const user = useSelector((state: RootState) => state.user.user);
  const [likes, setLikes] = useState(props.likes);
  const [isLiked, setIsLiked] = useToggle(props.userLikes.includes(user?.id));

  const { fetch } = useFetch<Response>(() => post(`article/like/${router.query.articleId}`));

  const LikeHandler = async () => {
    await fetch();
    setLikes((prevState) => (isLiked ? --prevState : ++prevState));
    setIsLiked();
  };

  return (
    <S.LikeButton>
      {user && <S.Button onClick={LikeHandler}>{isLiked ? <p>Unlike</p> : <p>Like</p>}</S.Button>}
      <p>{likes}</p>
      <p>Likes</p>
    </S.LikeButton>
  );
};

export default LikeButton;
