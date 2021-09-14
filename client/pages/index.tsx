import { S } from './Home.style';
import ListArticles from '@/components/shared/layouts/ListArticles';
import { mockArticle } from 'mockdata/articles.mockdata';

const Home: React.FC = () => {
  return (
    <S.Home>
      <ListArticles title="Explore" data={mockArticle} />
    </S.Home>
  );
};

export default Home;
