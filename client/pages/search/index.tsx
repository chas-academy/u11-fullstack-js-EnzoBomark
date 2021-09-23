import { S } from './Search.style';
import { NextPage } from 'next';
import PageHeader from '@/components/shared/templates/PageHeader';
import ArticleFilter from '@/components/article/ArticleFilter';
import ArticlePreview from '@/components/article/ArticlePreview';
import { IPaginatedArticles } from '@/interfaces/Article.interface';
import { useState, useRef, useCallback } from 'react';
import { ArticlesResponse } from '@/interfaces/AuthResponse.interface';
import { post } from '@/utils/http.utils';

const Search: NextPage<{ data: IPaginatedArticles }> = ({ data }) => {
  const [pageNumber, setPageNumber] = useState(1);
  const [query, setQuery] = useState('');

  const { loading, error, articles, hasMore } = useArticleSearch(query, pageNumber, data);

  const observer = useRef<IntersectionObserver>();
  const lastArticleElementRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          console.log(true);
          setPageNumber((prevPageNumber) => prevPageNumber + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  const handleSearch = (e) => {
    setQuery(e.target.value);
    setPageNumber(1);
  };

  return (
    <S.Search>
      <S.Searchbar placeholder="e.g. Rain gear..." value={query} onChange={handleSearch} />

      <PageHeader title="Search">
        <ArticleFilter />
      </PageHeader>

      {articles.map((item, index) => {
        if (articles.length === index + 1) {
          return (
            <span ref={lastArticleElementRef} key={item._id}>
              <ArticlePreview data={item} />
            </span>
          );
        } else {
          return (
            <span key={item._id}>
              <ArticlePreview data={item} />
            </span>
          );
        }
      })}

      {!articles.length && !loading && <div>No match</div>}
      {loading && <div>loading...</div>}
      {error && <div>{error}</div>}
    </S.Search>
  );
};

import { auth } from '@/guards/auth.guard';
import { useArticleSearch } from '@/hooks/useArticleSearch.hooks';

export const getServerSideProps = auth(async (context) => {
  const response = await post<ArticlesResponse>('search', {
    query: '',
    page: 1,
    model: 'article',
  });

  console.log(response);

  if (!response.ok) {
    return { props: { data: 'error' } };
  }

  return { props: { data: response.parsedBody.success } };
}, false);

export default Search;
