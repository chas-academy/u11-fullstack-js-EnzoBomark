import { mainTheme } from '@/styles/Themes';
import styled from 'styled-components';

const UserListItem = styled.div`
  width: 90vw;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 20px;
  padding: 10px 15px;
  border-radius: ${mainTheme['rounded-md']};
  border: ${mainTheme['border-sm']};
  background-color: ${mainTheme['color-dark-gray']};
  box-shadow: ${mainTheme['box-shadow']};
  cursor: pointer;
`;

const Creds = styled.div`
  width: 300px;
`;

const Info = styled.div`
  width: 140px;

  display: flex;
  align-items: center;
  gap: 10px;
`;

const Name = styled.div<{ role: string }>`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: ${(props) => (props.role === 'admin' ? 'gold' : 'white')};
`;

const Email = styled.div`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: ${mainTheme['font-xs']};
`;

const Created = styled.div`
  width: 70px;
  font-size: ${mainTheme['font-xs']};
  opacity: 0.5;
`;

const Updated = styled.div`
  width: 70px;
  font-size: ${mainTheme['font-xs']};
`;

export const S = { UserListItem, Name, Email, Created, Updated, Creds, Info };
