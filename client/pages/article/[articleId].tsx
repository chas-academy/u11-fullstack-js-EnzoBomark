import { NextPage } from 'next';

import ArticleShowcase from '@/components/article/ArticleShowcase';
import { Public } from '@/guards/public.guard';
import { IArticle } from '@/interfaces/Article.interface';
import { Response } from '@/interfaces/Response.interface';
import { S } from '@/styles/pages/Article.style';
import { get } from '@/utils/http.utils';

const Article: NextPage<{ data: IArticle }> = ({ data }) => {
  return (
    <>
      <ArticleShowcase data={data} />
    </>
  );
};

export const getServerSideProps = Public(async (context) => {
  const response = await get<Response>(`article/${context.params.articleId}`);

  if (!response.ok) {
    return { props: { data: null } };
  }

  return { props: { data: response.parsedBody.success } };
});

export default Article;
