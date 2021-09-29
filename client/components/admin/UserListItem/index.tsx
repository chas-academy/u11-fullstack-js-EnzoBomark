import { S } from './UserListItem.style';
import { IUser } from '@/interfaces/User.interface';
import React from 'react';
import router from 'next/router';

interface Props {
  data: IUser;
}

const UserListItem = React.forwardRef((props: Props, ref?: any) => {
  const clickHandler = () => {
    router.push(`admin/update-user/${props.data._id}`);
  };

  return (
    <S.UserListItem ref={ref} onClick={clickHandler}>
      <S.Creds>
        <S.Name role={props.data.role}>{props.data.name}</S.Name>
        <S.Email>{props.data.email}</S.Email>
      </S.Creds>
      <S.Info>
        <S.Created>Created: {props.data.createdAt.substring(0, 10)}</S.Created>
        <S.Updated>Updated: {props.data.updatedAt.substring(0, 10)}</S.Updated>
      </S.Info>
    </S.UserListItem>
  );
});

export default UserListItem;
