import { NextPage } from 'next';
import { useState } from 'react';

import ArticlePreview from '@/components/article/ArticlePreview';
import Spinner from '@/components/shared/misc/Spinner';
import PageHeader from '@/components/shared/templates/PageHeader';
import { Public } from '@/guards/public.guard';
import { useArticleSearch } from '@/hooks/useArticleSearch.hooks';
import { useObserver } from '@/hooks/useObserver.hooks';
import { ArticlesResponse, IArticle } from '@/interfaces/Article.interface';
import { S } from '@/styles/pages/Home.style';
import { post } from '@/utils/http.utils';

const Home: NextPage<{ data: IArticle[] }> = ({ data }) => {
  const [pageNumber, setPageNumber] = useState(1);

  const { isLoading, hasError, articles } = useArticleSearch('', pageNumber, data);

  const { lastElemRef } = useObserver(() => setPageNumber((prevPageNumber) => ++prevPageNumber));

  return (
    <S.Home>
      <Spinner isLoading={isLoading} />
      <PageHeader title="Explore" />

      {articles.map((item, index, { length }) => {
        return ++index !== length ? (
          <ArticlePreview data={item} key={item._id} />
        ) : (
          <ArticlePreview ref={lastElemRef} key={item._id} data={item} />
        );
      })}

      {hasError && <div>{hasError}</div>}
      {!articles.length && !isLoading && <div>No match</div>}
    </S.Home>
  );
};

export const getServerSideProps = Public(async (context) => {
  const response = await post<ArticlesResponse>('article/search', {
    query: '',
    page: 1,
  });

  if (!response.ok) {
    return { props: { data: 'error' } };
  }

  return { props: { data: response.parsedBody.success } };
});

export default Home;
