import Footer from '../Footer'
import Header from '../Header'
import { MainStyle } from './Main.style'

const Main: React.FC = (props) => {
  return (
    <MainStyle>
      <Header />
      <main>{props.children}</main>
      <Footer />
    </MainStyle>
  )
}

export default Main
