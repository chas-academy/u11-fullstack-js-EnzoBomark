import { useState } from 'react';

import { ArticlesResponse, IPaginatedArticles } from '@/interfaces/Article.interface';
import { post } from '@/utils/http.utils';

import { useFetchDebounce } from './useFetchDebounce.hooks';
import { useMount } from './useMount';

export const useArticleSearch = (
  query: string,
  page: number,
  ssrLoadedData: IPaginatedArticles
) => {
  const [articles, setArticles] = useState(ssrLoadedData.data);

  const { isLoading, hasError, data } = useFetchDebounce<ArticlesResponse>(
    () => post('search', { query, page }),
    [query, page],
    500
  );

  useMount(() => {
    setArticles([]);
  }, [query]);

  useMount(() => {
    setArticles((prevData) => {
      return [...new Set([...prevData, ...data.success.data])];
    });
  }, [data]);

  return { isLoading, hasError, articles };
};
