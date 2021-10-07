import Footer from '../Footer';
import Header from '../Header';
import { S } from './Main.style';

const Main: React.FC = (props) => {
  return (
    <S.Main>
      <Header />
      <S.Wrapper>{props.children}</S.Wrapper>
      <Footer />
    </S.Main>
  );
};

export default Main;
