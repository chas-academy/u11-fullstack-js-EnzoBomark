import ArticleShowcase from '@/components/article/ArticleShowcase';
import { NextPage } from 'next';
import { auth } from '@/guards/auth.guard';
import { Response } from '@/interfaces/AuthResponse.interface';
import { get } from '@/utils/rest/http.utils';
import { IArticle } from '@/interfaces/Article.interface';

const Article: NextPage<{ data: IArticle }> = ({ data }) => {
  return (
    <>
      <ArticleShowcase data={data} />
    </>
  );
};

export const getServerSideProps = auth(async (context) => {
  const response = await get<Response>(`article/${context.params.articleId}`);

  if (!response.ok) {
    return { props: { data: null } };
  }

  return { props: { data: response.parsedBody.success } };
}, false);

export default Article;
