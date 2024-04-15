export interface UserProps {
  role: UserRoles;
  email: string;
  password: string;
}

export interface CreateUserProps {
  email: string;
  password: string;
}

export enum UserRoles {
  Member = 'member',
  Premium = 'premium',
}
