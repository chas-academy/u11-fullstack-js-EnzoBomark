import { S } from '@/styles/pages/Home.style';
import { NextPage } from 'next';
import PageHeader from '@/components/shared/templates/PageHeader';
import ArticlePreview from '@/components/article/ArticlePreview';
import { ArticlesResponse, IPaginatedArticles } from '@/interfaces/Article.interface';
import { post } from '@/utils/http.utils';
import { useArticleSearch } from '@/hooks/useArticleSearch.hooks';
import { useObserver } from '@/hooks/useObserver.hooks';
import Spinner from '@/components/shared/misc/Spinner';
import { useState } from 'react';

const Home: NextPage<{ data: IPaginatedArticles }> = ({ data }) => {
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

import { Public } from '@/guards/public.guard';
export const getServerSideProps = Public(async (context) => {
  const response = await post<ArticlesResponse>('search', {
    query: '',
    page: 1,
  });

  if (!response.ok) {
    return { props: { data: 'error' } };
  }

  return { props: { data: response.parsedBody.success } };
});

export default Home;
