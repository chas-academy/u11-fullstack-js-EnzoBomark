import { S } from '@/styles/pages/Search.style';
import { NextPage } from 'next';
import { useState } from 'react';
import { post } from '@/utils/http.utils';
import PageHeader from '@/components/shared/templates/PageHeader';
import ArticlePreview from '@/components/article/ArticlePreview';
import { IPaginatedArticles } from '@/interfaces/Article.interface';
import { ArticlesResponse } from '@/interfaces/AuthResponse.interface';
import { useArticleSearch } from '@/hooks/useArticleSearch.hooks';
import { useObserver } from '@/hooks/useObserver.hooks';

const Search: NextPage<{ data: IPaginatedArticles }> = ({ data }) => {
  const [pageNumber, setPageNumber] = useState(1);
  const [query, setQuery] = useState('');

  const { isLoading, hasError, articles } = useArticleSearch(query, pageNumber, data);

  const { lastElemRef } = useObserver(() => setPageNumber((prevPageNumber) => ++prevPageNumber));

  const handleSearch = (e) => {
    setQuery(e.target.value);
    setPageNumber(1);
  };

  const error = hasError && <div>{hasError}</div>;
  const loading = isLoading && <div>Loading...</div>;
  const noMatch = !articles.length && !isLoading && <div>No match</div>;

  return (
    <S.Search>
      <S.Searchbar placeholder="e.g. Rain gear..." value={query} onChange={handleSearch} />

      <PageHeader title="Search" />

      {articles.map((item, index, { length }) => {
        return ++index !== length ? (
          <ArticlePreview data={item} key={item._id} />
        ) : (
          <ArticlePreview ref={lastElemRef} key={item._id} data={item} />
        );
      })}

      {error}
      {loading}
      {noMatch}
    </S.Search>
  );
};

import { auth } from '@/guards/auth.guard';
export const getServerSideProps = auth(async (context) => {
  const response = await post<ArticlesResponse>('search', {
    query: '',
    page: 1,
    model: 'article',
  });

  if (!response.ok) {
    return { props: { data: 'error' } };
  }

  return { props: { data: response.parsedBody.success } };
}, false);

export default Search;