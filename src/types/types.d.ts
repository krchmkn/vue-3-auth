type RegisterReq = {
  email: string
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

type RegenerateTokensReg = {
  refreshToken: string
}
