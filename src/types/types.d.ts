type RegisterReq = {
  email: string
  emailConfirmCode: string | number
  password: string
  userinfo: {
    account_name: string
  }
}

type LoginReq = {
  credential: string
  password: string
}

type LogoutReg = {
  refreshToken: string
}

type SendConfirmCodeReq = {
  email: string
  phone: string
  use_call: boolean
}

declare module 'npmpackage'
