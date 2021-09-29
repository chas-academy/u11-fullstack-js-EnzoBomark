import ArticleShowcase from '@/components/article/ArticleShowcase';
import { NextPage } from 'next';
import { Response } from '@/interfaces/Response.interface';
import { get } from '@/utils/http.utils';
import { IArticle } from '@/interfaces/Article.interface';

const Article: NextPage<{ data: IArticle }> = ({ data }) => {
  return (
    <>
      <ArticleShowcase data={data} />
    </>
  );
};

import { Public } from '@/guards/public.guard';
export const getServerSideProps = Public(async (context) => {
  const response = await get<Response>(`article/${context.params.articleId}`);

  if (!response.ok) {
    return { props: { data: null } };
  }

  return { props: { data: response.parsedBody.success } };
});

export default Article;
