import { S } from './Sidebar.style';
import { useSelector } from 'react-redux';
import NavLink from '@/components/shared/links/NavLink';

interface Props {
  isOpen: boolean;
  closeSidebar: () => void;
}

const Sidebar: React.FC<Props> = (props: Props) => {
  const user: User = useSelector((state: UserState) => state.user);

  return (
    <>
      <S.SidebarBackground isOpen={props.isOpen} onClick={props.closeSidebar} />
      <S.Sidebar isOpen={props.isOpen}>
        <S.SidebarBtn onClick={props.closeSidebar}>Close</S.SidebarBtn>
        <S.SidebarMenu>
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
              <NavLink href="/editor">Editer</NavLink>
              <NavLink href="/saved">Saved</NavLink>
              <NavLink href="/settings">Settings</NavLink>
            </>
          )}
        </S.SidebarMenu>
      </S.Sidebar>
    </>
  );
};

export default Sidebar;
