import { UserRoles } from './user-roles.model';

export interface User {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  roles?: UserRoles;
}
