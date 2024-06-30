import { NavigatorScreenParams } from "@react-navigation/native";

export enum SetupStoreStackName {
  HOME = "SetupMain",
  GET_DATA = "SetupGetData",
  RESULT = "SetupResult"
}

export type SetupStoreParams = {
  [SetupStoreStackName.HOME]: undefined,
  [SetupStoreStackName.GET_DATA]: undefined,
  [SetupStoreStackName.RESULT]: undefined
}

export enum UnauthorizedStackName {
  PROFILE =  'UnAuthProfile',
  LANDING = 'Landing',
  SCANNER = 'Scanner',
}
export type UnauthorizedParams = {
  [UnauthorizedStackName.SCANNER]: undefined,
  [UnauthorizedStackName.LANDING]: undefined,
  [UnauthorizedStackName.PROFILE]: NavigatorScreenParams<UnAuthProfileParams>,
}

export enum UnAuthProfileStackName {
  MAIN = "Main",
  LOGIN = "Login",
  ORDER_HISTORY = "OrderHistory",
  FEEDBACK = "Feedback",
}
export type UnAuthProfileParams = {
  [UnAuthProfileStackName.MAIN]: undefined;
  [UnAuthProfileStackName.LOGIN]: undefined;
  [UnAuthProfileStackName.ORDER_HISTORY]: undefined;
  [UnAuthProfileStackName.FEEDBACK]: undefined;
}

export enum AuthorizedStackName {
  HOME = "Home",
  CREATE_BILL = "CreateBill",
  IMPORT = "Import",
  MENU = "Menu",
  PROFILE = "Profile"
}
export type AuthorizedParams = {
  [AuthorizedStackName.HOME]: undefined,
  [AuthorizedStackName.CREATE_BILL]: NavigatorScreenParams<CreateBillParams>,
  [AuthorizedStackName.IMPORT]: NavigatorScreenParams<CreateImportParams>,
  [AuthorizedStackName.MENU]: NavigatorScreenParams<MenuParams>,
  [AuthorizedStackName.PROFILE]: undefined,
}

export enum MenuStackName{
  MENU_HOME = "MenuHome",
}
export type MenuParams = {
  [MenuStackName.MENU_HOME]: undefined
}

export enum CreateBillStackName{
  CREATE_BILL_HOME = "CreateBillHome",
  ADD_BILL_ITEM = "AddBillItems"
}
export type CreateBillParams = {
  [CreateBillStackName.CREATE_BILL_HOME]: undefined,
  [CreateBillStackName.ADD_BILL_ITEM]: undefined
}

export enum CreateImportStackName{
  CREATE_IMPORT_HOME = "CreateImportHome",
  ADD_IMPORT_ITEM = "AddImportItems",
  CONFIRM_IMPORT = "ConfirmImport",
}
export type CreateImportParams = {
  [CreateImportStackName.CREATE_IMPORT_HOME]: undefined,
  [CreateImportStackName.ADD_IMPORT_ITEM]: undefined,
  [CreateImportStackName.CONFIRM_IMPORT]: undefined
}
