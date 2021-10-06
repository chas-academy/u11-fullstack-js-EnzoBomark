import { NextPage } from 'next';
import { useState } from 'react';
import { useSelector } from 'react-redux';

import ArticlePreview from '@/components/article/ArticlePreview';
import Spinner from '@/components/shared/misc/Spinner';
import PageHeader from '@/components/shared/templates/PageHeader';
import { Private } from '@/guards/private.guard';
import { useArticleSearch } from '@/hooks/useArticleSearch.hooks';
import { useObserver } from '@/hooks/useObserver.hooks';
import { ArticlesResponse, IArticle } from '@/interfaces/Article.interface';
import { RootState, wrapper } from '@/store/index';
import { S } from '@/styles/pages/Home.style';
import { post } from '@/utils/http.utils';

const Articles: NextPage<{ data: IArticle[] }> = ({ data }) => {
  const [pageNumber, setPageNumber] = useState(1);
  const user = useSelector((state: RootState) => state.user.user);

  const { isLoading, hasError, articles } = useArticleSearch(user.id, pageNumber, data);

  const { lastElemRef } = useObserver(() => setPageNumber((prevPageNumber) => ++prevPageNumber));

  return (
    <S.Home>
      <Spinner isLoading={isLoading} />
      <PageHeader title="My Articles" />

      {articles.map((item, index, { length }) => {
        return ++index !== length ? (
          <ArticlePreview data={item} key={item._id} update={true} />
        ) : (
          <ArticlePreview ref={lastElemRef} key={item._id} data={item} update={true} />
        );
      })}

      {hasError && <div>{hasError}</div>}
      {!articles.length && !isLoading && <div>No match</div>}
    </S.Home>
  );
};

export const getServerSideProps = Private(
  wrapper.getServerSideProps((store) => async (context) => {
    const state = store.getState();

    const response = await post<ArticlesResponse>('article/search', {
      query: state.user.user.id,
      page: 1,
    });

    if (!response.ok) {
      return { props: { data: 'error' } };
    }

    return { props: { data: response.parsedBody.success } };
  })
);

export default Articles;
