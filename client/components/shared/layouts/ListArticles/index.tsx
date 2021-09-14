import { S } from './ListArticles.style';
import ArticlePeview from '@/components/shared/templates/ArticlePreview';
import Breakline from '../../templates/Breakline';
import ListHeader from '../../templates/ListHeader';
import ArticleFilter from '../../templates/ArticleFilter';

interface Props {
  title: string;
  data: any;
}

const ListArticles = (props: Props) => {
  return (
    <S.ListArticles>
      {/* Header => explorer & filter  */}
      <S.Topbar>
        <ListHeader>{props.title}</ListHeader>
        <ArticleFilter />
      </S.Topbar>

      <Breakline />

      {props.data.map((item) => {
        return <ArticlePeview key={item._id} data={item} />;
      })}
    </S.ListArticles>
  );
};

export default ListArticles;
