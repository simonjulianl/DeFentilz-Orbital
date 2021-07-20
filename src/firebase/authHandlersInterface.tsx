export interface errorObj {
  code: string;
  message: string;
}

export interface successObj {
  code: string;
  message: string;
}

export interface hookVars {
  name: string;
  email: string;
  password: string;
  error?: errorObj;
  success?: successObj;
}

export interface settersObject {
  setName: (arg0: string) => void;
  setEmail: (arg0: string) => void;
  setPassword: (arg0: string) => void;
  setError: (arg0?: errorObj) => void;
  setSuccess: (arg0?: successObj) => void;
}

export interface modalCallbacks {
  onOpenLogin: () => void;
  onCloseLogin: () => void;
  onOpenSignup: () => void;
  onCloseSignup: () => void;
  onOpenPwd: () => void;
  onClosePwd: () => void;
  onCloseDrawer: () => void;
}

export type resolveHandler = (success?: successObj) => void;
export type errorHandler = (error?: errorObj) => void;
export type onChangeHandler = (event: {
  currentTarget: {
    id: any;
    value: any;
  };
}) => void;

export type emailSignInHandler = (event: {
  preventDefault: () => void;
}) => void;

export type emailSignUpHandler = (event: {
  preventDefault: () => void;
}) => void;

export type googleSignInHandler = (event: {
  preventDefault: () => void;
}) => void;

export type changePasswordHandler = (event: {
  preventDefault: () => void;
}) => void;

export type logOutHandler = () => void;
export type toLoginHandler = () => void;
export type toSignUpHandler = () => void;
export type toReqPwdHandler = () => void;
