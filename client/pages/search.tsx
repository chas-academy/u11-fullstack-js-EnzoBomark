import { NextPage } from 'next';
import { useState } from 'react';

import ArticlePreview from '@/components/article/ArticlePreview';
import NoMatch from '@/components/shared/misc/NoMatch';
import Spinner from '@/components/shared/misc/Spinner';
import PageHeader from '@/components/shared/templates/PageHeader';
import { Public } from '@/guards/public.guard';
import { useArticleSearch } from '@/hooks/useArticleSearch.hooks';
import { useObserver } from '@/hooks/useObserver.hooks';
import { ArticlesResponse, IArticle } from '@/interfaces/Article.interface';
import { S } from '@/styles/pages/Search.style';
import { post } from '@/utils/http.utils';

const Search: NextPage<{ data: IArticle[] }> = ({ data }) => {
  const [pageNumber, setPageNumber] = useState(1);
  const [query, setQuery] = useState('');

  const { isLoading, hasError, articles } = useArticleSearch(query, pageNumber, data);

  const { lastElemRef } = useObserver(() => setPageNumber((prevPageNumber) => ++prevPageNumber));

  const handleSearch = (e) => {
    setQuery(e.target.value);
    setPageNumber(1);
  };

  return (
    <S.Search>
      <Spinner isLoading={isLoading} />
      <S.Searchbar placeholder="e.g. Rain gear..." value={query} onChange={handleSearch} />

      <PageHeader title="Search" />

      {articles.map((item, index, { length }) => {
        return ++index !== length ? (
          <ArticlePreview data={item} key={item._id} />
        ) : (
          <ArticlePreview ref={lastElemRef} key={item._id} data={item} />
        );
      })}

      {hasError && <div>{hasError}</div>}
      {!articles.length && !isLoading && <NoMatch type="article" />}
    </S.Search>
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

export default Search;
