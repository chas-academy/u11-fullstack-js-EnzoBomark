interface User {
  id: string;
  name: string;
  email: string;
}

type UserState = {
  user: User;
};

type UserAction = {
  type: string;
  user: User;
};

type DispatchType = (args: UserAction) => UserAction;
