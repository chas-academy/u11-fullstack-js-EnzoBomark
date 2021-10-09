import { NextPage } from 'next';
import { useState } from 'react';

import ArticlePreview from '@/components/article/ArticlePreview';
import NoMatch from '@/components/shared/misc/NoMatch';
import Spinner from '@/components/shared/misc/Spinner';
import PageHeader from '@/components/shared/templates/PageHeader';
import { Private } from '@/guards/private.guard';
import { useArticleSearch } from '@/hooks/useArticleSearch.hooks';
import { useObserver } from '@/hooks/useObserver.hooks';
import {
    ArticlesResponse,
    IArticle
} from '@/interfaces/Article.interface';
import { S } from '@/styles/pages/Home.style';
import { post } from '@/utils/http.utils';

const Saved: NextPage<{ data: IArticle[] }> = ({ data }) => {
  const [pageNumber, setPageNumber] = useState(1);

  const { isLoading, hasError, articles } = useArticleSearch('', pageNumber, data, 'user/saved');

  const { lastElemRef } = useObserver(() => setPageNumber((prevPageNumber) => ++prevPageNumber));

  return (
    <S.Home>
      <Spinner isLoading={isLoading} />
      <PageHeader title="My Articles" />

      {articles.map((item, index, { length }) => {
        return ++index !== length ? (
          <ArticlePreview data={item} key={item._id} />
        ) : (
          <ArticlePreview ref={lastElemRef} key={item._id} data={item} />
        );
      })}

      {hasError && <div>{hasError}</div>}
      {!articles.length && !isLoading && <NoMatch type="article" />}
    </S.Home>
  );
};

export const getServerSideProps = Private(async (context) => {
  const { req, res } = context;

  const { access_token, refresh_token } = req.cookies;

  const response = await post<ArticlesResponse>(
    'user/saved',
    {
      query: '',
      page: 1,
    },
    {
      authorization: access_token,
      'x-refresh': refresh_token,
    }
  );

  if (!response.ok) {
    return { props: { data: 'error' } };
  }

  return { props: { data: response.parsedBody.success } };
});

export default Saved;
