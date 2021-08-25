import { S } from './Header.style';
import NavLink from './NavLink';

const Header: React.FC = (props) => {
  return (
    <S.Header>
      <NavLink href="/">Home</NavLink>
      <NavLink href="/login">Login</NavLink>
      <NavLink href="/register">Register</NavLink>
      <NavLink href="/search">Search</NavLink>
    </S.Header>
  );
};

export default Header;
