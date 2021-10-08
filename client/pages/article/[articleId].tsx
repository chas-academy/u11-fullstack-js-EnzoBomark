import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useState } from 'react';

import ArticleShowcase from '@/components/article/ArticleShowcase';
import { Public } from '@/guards/public.guard';
import { useFetch } from '@/hooks/useFetch.hooks';
import { IArticle } from '@/interfaces/Article.interface';
import { Response } from '@/interfaces/Response.interface';
import { S } from '@/styles/pages/Article.style';
import { get, post } from '@/utils/http.utils';

const Article: NextPage<{ response: IArticle }> = ({ response }) => {
  console.log(response);
  const router = useRouter();
  const [values, setValues] = useState();
  const { fetch } = useFetch<Response>(() => post(`article/like/${router.query.articleId}`));

  const LikeHandler = async () => {
    await fetch();
  };

  return (
    <>
      <ArticleShowcase data={response} />
      <button onClick={LikeHandler}>Like</button>
    </>
  );
};

export const getServerSideProps = Public(async (context) => {
  const response = await get<Response>(`article/${context.params.articleId}`);

  if (!response.ok) {
    return { props: { response: null } };
  }

  return { props: { response: response.parsedBody.success } };
});

export default Article;
