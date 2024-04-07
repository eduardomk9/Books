import { IAuth } from "../../auth/interfaces/IAuth";
import { IMemberOf } from "./IMemberOf";

export interface IUser {
  id: number;
  idProf?: number;
  firstName: string;
  lastName: string;
  jobTitle: string | null;
  mail: string;
  phone: string | null;
  photo: string | null;
  isActive: boolean;
  isDeleted: boolean;
  memberOf: IMemberOf[];
  auth: IAuth;
}
