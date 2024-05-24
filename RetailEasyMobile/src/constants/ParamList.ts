
export type UnauthorizedParams = {
  Login: undefined,
  Landing: undefined,
  Feedback: undefined,
  CustomerLookupOrder: undefined,
}


export type AuthorizedParams = {
  Menu: undefined,
  ManageProducts: {roles: string[]},
  ManageEmployees: {roles: string[]},
  ManageBills: {roles: string[]},
  CreateBill: undefined
}
