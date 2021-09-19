import { S } from './Navbar.style';
import { useSelector } from 'react-redux';
import NavLink from '@/components/shared/links/NavLink';

interface Props {
  openSidebar: () => void;
}

const Navbar: React.FC<Props> = (props: Props) => {
  const user: User = useSelector((state: UserState) => state.user);

  return (
    <S.Navbar>
      <S.Nav>
        <S.NavBtn onClick={props.openSidebar}>Menu</S.NavBtn>
        <S.NavMenu>
          <NavLink href="/">Home</NavLink>
          <NavLink href="/search">Search</NavLink>

          {!user && (
            <>
              <NavLink href="/login">Login</NavLink>
              <NavLink href="/register">Register</NavLink>
            </>
          )}

          {user && (
            <>
              <NavLink href="/editor">Editor</NavLink>
              <NavLink href="/saved">Saved</NavLink>
              <NavLink href="/settings">Settings</NavLink>
            </>
          )}
        </S.NavMenu>
      </S.Nav>
    </S.Navbar>
  );
};

export default Navbar;
