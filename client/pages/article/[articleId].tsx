import { NextPage } from 'next';

import { S } from '@/styles/pages/Article.style';
import ArticleShowcase from '@/components/article/ArticleShowcase';
import { IArticle } from '@/interfaces/Article.interface';
import { Response } from '@/interfaces/Response.interface';
import { get } from '@/utils/http.utils';
import { Public } from '@/guards/public.guard';

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
