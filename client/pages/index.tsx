import { S } from './Home.style';
import { mockArticle } from 'mockdata/articles.mockdata';
import PageHeader from '@/components/shared/templates/PageHeader';
import ArticleFilter from '@/components/article/ArticleFilter';
import ArticlePreview from '@/components/article/ArticlePreview';

const Home: React.FC = () => {
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
