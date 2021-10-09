import { NextPage } from 'next';

import ArticleShowcase from '@/components/article/ArticleShowcase';
import LikeButton from '@/components/shared/buttons/LikeButton';
import SaveButton from '@/components/shared/buttons/SaveButton';
import Public from '@/guards/public.guard';
import { IArticle } from '@/interfaces/Article.interface';
import { Response } from '@/interfaces/Response.interface';
import { wrapper } from '@/store/index';
import { S } from '@/styles/pages/Article/Article.style';
import { post } from '@/utils/http.utils';

const Article: NextPage<{ res: IArticle }> = ({ res }) => {
  return (
    <S.Article>
      <ArticleShowcase data={res} />
      <S.InteractionBar>
        <SaveButton isSaved={res.isSaved} />
        <LikeButton likes={res.likes} isLiked={res.isLiked} />
      </S.InteractionBar>
    </S.Article>
  );
};

export const getServerSideProps = Public(
  wrapper.getServerSideProps((store) => async (context) => {
    const state = store.getState();

    const response = await post<Response>(`article/${context.params.articleId}`, {
      user: state.user.user?.id,
    });

    if (!response.ok) {
      return { props: { res: null } };
    }

    return { props: { res: response.parsedBody.success } };
  })
);

export default Article;
