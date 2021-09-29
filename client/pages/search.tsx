import ArticlePreview from '@/components/article/ArticlePreview';
import { ArticlesResponse } from '@/interfaces/Article.interface';
import { IPaginatedArticles } from '@/interfaces/Article.interface';
import { NextPage } from 'next';
import PageHeader from '@/components/shared/templates/PageHeader';
import { Public } from '@/guards/public.guard';
import { S } from '@/styles/pages/Search.style';
import Spinner from '@/components/shared/misc/Spinner';
import { post } from '@/utils/http.utils';
import { useArticleSearch } from '@/hooks/useArticleSearch.hooks';
import { useObserver } from '@/hooks/useObserver.hooks';
import { useState } from 'react';

const Search: NextPage<{ data: IPaginatedArticles }> = ({ data }) => {
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
      {!articles.length && !isLoading && <div>No match</div>}
    </S.Search>
  );
};

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

export default Search;
