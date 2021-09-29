import { S } from '@/styles/pages/Home.style';
import { NextPage } from 'next';
import PageHeader from '@/components/shared/templates/PageHeader';
import ArticleFilter from '@/components/article/ArticleFilter';
import ArticlePreview from '@/components/article/ArticlePreview';
import { ArticlesResponse, IArticle } from '@/interfaces/Article.interface';
import { get } from '@/utils/http.utils';

const Home: NextPage<{ data: [IArticle] }> = ({ data }) => {
  return (
    <S.Home>
      <PageHeader title="Explore">
        <ArticleFilter />
      </PageHeader>

      {data.map((item) => {
        return <ArticlePreview key={item._id} data={item} />;
      })}
    </S.Home>
  );
};

import { Public } from '@/guards/public.guard';
export const getServerSideProps = Public(async (context) => {
  const response = await get<ArticlesResponse>('articles');

  if (!response.ok) {
    return { props: { data: null } };
  }

  return { props: { data: response.parsedBody.success } };
});

export default Home;
