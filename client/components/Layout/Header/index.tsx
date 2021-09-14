import { S } from './Header.style';
import NavLink from '@/components/shared/links/NavLink';

const Header: React.FC = (props) => {
  return (
    <S.Header>
      <NavLink href="/">Home</NavLink>
      <NavLink href="/search">Search</NavLink>
      <NavLink href="/login">Login</NavLink>
      <NavLink href="/register">Register</NavLink>
      <NavLink href="/editor">Editer</NavLink>
      <NavLink href="/saved">Saved</NavLink>
      <NavLink href="/settings">Settings</NavLink>
    </S.Header>
  );
};

export default Header;
