import { S } from './Home.style';
import { NextPage } from 'next';
import PageHeader from '@/components/shared/templates/PageHeader';
import ArticleFilter from '@/components/article/ArticleFilter';
import ArticlePreview from '@/components/article/ArticlePreview';

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

import { auth } from '@/guards/auth.guard';
import { Response } from '@/interfaces/AuthResponse.interface';
import { get } from '@/utils/rest/http.utils';
import { IArticle } from '@/interfaces/Article.interface';

export const getServerSideProps = auth(async (context) => {
  const response = await get<Response>('articles');

  if (!response.ok) {
    return { props: { data: null } };
  }

  return { props: { data: response.parsedBody.success } };
}, false);

export default Home;
