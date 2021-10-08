import { NextPage } from 'next';
import { useRouter } from 'next/router';
import {
    useEffect,
    useState
} from 'react';
import { useSelector } from 'react-redux';

import ArticleShowcase from '@/components/article/ArticleShowcase';
import LikeButton from '@/components/shared/buttons/LikeButton';
import SaveButton from '@/components/shared/buttons/SaveButton';
import { Public } from '@/guards/public.guard';
import { useFetch } from '@/hooks/useFetch.hooks';
import { IArticle } from '@/interfaces/Article.interface';
import { Response } from '@/interfaces/Response.interface';
import { RootState } from '@/store/index';
import { S } from '@/styles/pages/Article.style';
import {
    get,
    post
} from '@/utils/http.utils';

const Article: NextPage<{ res: IArticle }> = ({ res }) => {
  useEffect(() => {
    console.log(res);
  }, []);
  return (
    <S.Article>
      <ArticleShowcase data={res} />
      <S.InteractionBar>
        <SaveButton likes={res.likes} userLikes={res.likeUsers} />
        <LikeButton likes={res.likes} userLikes={res.likeUsers} />
      </S.InteractionBar>
    </S.Article>
  );
};

export const getServerSideProps = Public(async (context) => {
  const response = await get<Response>(`article/${context.params.articleId}`);

  if (!response.ok) {
    return { props: { res: null } };
  }

  return { props: { res: response.parsedBody.success } };
});

export default Article;
