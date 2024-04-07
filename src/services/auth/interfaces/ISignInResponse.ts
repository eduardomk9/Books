import { IToken } from "../../interfaces/IToken";
import { IUser } from "../../user/interfaces/IUser";


export interface ISignInResponse {
    profile: IUser;
    token: IToken;
}