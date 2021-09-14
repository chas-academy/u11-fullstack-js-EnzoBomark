import { S } from './Home.style';
import Explorer from '@/components/shared/templates/Explorer';
import { mockArticle } from 'mockdata/articles.mockdata';

const Home: React.FC = () => {
  return (
    <S.Home>
      {/* Header => explorer & filter & hr  */}

      {mockArticle.map((item) => {
        return <Explorer key={item._id} data={item} />;
      })}
    </S.Home>
  );
};

export default Home;
