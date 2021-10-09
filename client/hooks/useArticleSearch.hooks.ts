import { useState } from 'react';

import {
    ArticlesResponse,
    IArticle
} from '@/interfaces/Article.interface';
import { post } from '@/utils/http.utils';

import { useFetchDebounce } from './useFetchDebounce.hooks';
import { useMount } from './useMount';

export const useArticleSearch = (
  query: string,
  page: number,
  ssrLoadedData: IArticle[],
  path = 'article/search'
) => {
  const [articles, setArticles] = useState(ssrLoadedData);

  const { isLoading, hasError, data } = useFetchDebounce<ArticlesResponse>(
    () => post(path, { query, page }),
    [query, page],
    500
  );

  useMount(() => {
    setArticles([]);
  }, [query]);

  useMount(() => {
    setArticles((prevData) => {
      return [...new Set([...prevData, ...data.success])];
    });
  }, [data]);

  return { isLoading, hasError, articles };
};
