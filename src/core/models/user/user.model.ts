import { BaseModel, UserRoleEnum, UserStatusEnum } from "@/common";

export interface IUser extends BaseModel {
  firstName?: string;
  lastName?: string;
  email: string;
  phone?: string;
  role: UserRoleEnum;
  status: UserStatusEnum;
  deviceToken?: string;
  deviceType?: string;
  avatar?: string;
  cover?: string;
}
