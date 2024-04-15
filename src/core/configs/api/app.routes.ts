// Root
export const authRoot = 'auth';
export const usersRoot = 'users';
export const budgetsRoot = 'budgets';
export const accountsRoot = 'accountsRoot';

// API versions
export const v1 = 'v1';

export const routesV1 = {
  version: v1,
  auth: {
    root: authRoot,
    signIn: `/${authRoot}/sign-in`,
    signUp: `/${authRoot}/sign-up`,
  },
  user: {
    root: usersRoot,
  },
  budget: {
    root: budgetsRoot,
  },
  accounts: {
    root: accountsRoot,
    getOne: `/${accountsRoot}/:id`,
    delete: `/${accountsRoot}/:id`,
  },
};
