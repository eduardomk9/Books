import { IOptions } from "../../interfaces/IOptions";

export interface IUserCreateAndUpdate {
  id:number
  idAuth: number;
  idProf: number;
  firstName: string;
  lastName: string;
  jobTitle?: string | null;
  mail: string;
  password?: string;
  phone?: string | null;
  photo?: string | null;
  isActive: boolean;
  organizations: IOptions[]
}
