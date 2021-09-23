import { useEffect, useState } from 'react';
import { useAsyncDebounce } from './useAsyncDebounce.hooks';
import { ArticlesResponse } from '@/interfaces/AuthResponse.interface';
import { post } from '@/utils/http.utils';
import { IPaginatedArticles } from '@/interfaces/Article.interface';
import { useDidMountEffect } from './useDidMountEffect.hooks';

export const useArticleSearch = (
  query: string,
  pageNumber: number,
  ssrLoadedData: IPaginatedArticles
) => {
  const [articles, setArticles] = useState(ssrLoadedData.data);
  const [hasMore, setHasMore] = useState(ssrLoadedData.objectsFound > 1);

  const { isLoading, hasError, data } = useAsyncDebounce<ArticlesResponse>(
    async () => await post('search', { query: query, page: pageNumber, model: 'article' }),
    [query, pageNumber],
    500
  );

  useDidMountEffect(() => {
    setArticles([]);
  }, [query]);

  useDidMountEffect(() => {
    setArticles((prevData) => {
      return [...new Set([...prevData, ...data.success.data])];
    });
    setHasMore(data.success.objectsFound > 1);
  }, [data]);

  return { isLoading, hasError, articles, hasMore };
};
