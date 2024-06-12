import { NavigatorScreenParams } from "@react-navigation/native";

export enum UnauthorizedStackName {
  PROFILE =  'Profile',
  LANDING = 'Landing',
  SCANNER = 'Scanner',
}
export type UnauthorizedParams = {
  [UnauthorizedStackName.PROFILE]: undefined,
  [UnauthorizedStackName.LANDING]: undefined,
  [UnauthorizedStackName.SCANNER]: NavigatorScreenParams<UnAuthProfileParams>,
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

export enum UnAuthScannerStackName {
  CAMERA = "Camera",
  SCAN_RESULT = "ScanResult",
}
export type UnAuthScannerParams = {
  [UnAuthScannerStackName.CAMERA]: undefined,
  [UnAuthScannerStackName.SCAN_RESULT]: { barcode: string },
}


export type AuthorizedParams = {
  Menu: undefined,
  ManageProducts: {roles: string[]},
  ManageEmployees: {roles: string[]},
  ManageBills: {roles: string[]},
  CreateBill: undefined
}
