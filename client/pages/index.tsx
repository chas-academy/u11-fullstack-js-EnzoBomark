import { S } from './Home.style';
import { mockArticle } from 'mockdata/articles.mockdata';
import PageHeader from '@/components/shared/templates/PageHeader';
import ArticleFilter from '@/components/article/ArticleFilter';
import ArticlePreview from '@/components/article/ArticlePreview';
import { get } from '@/utils/rest/http.utils';
import { NextPage } from 'next';
import { GetServerSideProps } from 'next';

interface Props {
  data?: any;
}

const Home: NextPage<Props> = (props: Props) => {
  console.log(props);

  return (
    <S.Home>
      <PageHeader title="Explore">
        <ArticleFilter />
      </PageHeader>

      {mockArticle.map((item) => {
        return <ArticlePreview key={item._id} data={item} />;
      })}
    </S.Home>
  );
};

export default Home;

export const getserversideprops: GetServerSideProps = async ({ res }) => {
  const data = await get('auth/user', res);

  // if (!res) {
  //   return {
  //     redirect: {
  //       destination: '/',
  //       permanent: false,
  //     },
  //   };
  // }

  return {
    props: { data }, // will be passed to the page component as props
  };
};
