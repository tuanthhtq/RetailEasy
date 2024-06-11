import { NavigatorScreenParams } from "@react-navigation/native";

export type UnauthorizedParams = {
  Landing: undefined,
  Scanner: undefined,
  Profile: NavigatorScreenParams<UnAuthProfileParams>,
}

export type UnAuthProfileParams = {
  Main: undefined,
  Login: undefined,
  OrderHistory: undefined,
  Feedback: undefined,
}

export type UnAuthScannerParams = {
  Camera: undefined,
  ScanResult: { barcode: string },
}


export type AuthorizedParams = {
  Menu: undefined,
  ManageProducts: {roles: string[]},
  ManageEmployees: {roles: string[]},
  ManageBills: {roles: string[]},
  CreateBill: undefined
}
