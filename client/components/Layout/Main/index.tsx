import Footer from '../Footer';
import Header from '../Header';
import { S } from './Main.style';

const Main: React.FC = (props) => {
  return (
    <S.Main>
      <Header />
      <main>{props.children}</main>
      <Footer />
    </S.Main>
  );
};

export default Main;
