
export type UnauthorizedParams = {
  Landing: undefined,
  Scanner: undefined,
  Profile: undefined,
}

export type UnAuthProfileParams = {
  Login: undefined,
  OrderLookup: undefined,
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
