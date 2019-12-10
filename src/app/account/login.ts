interface ILogin {
  userName: string;
  password: string;
}

class Login implements ILogin {
  userName: string;
  password: string;

  constructor(userName: string, password: string) {
    this.userName = userName;
    this.password = password;
  }

}

export {
  ILogin,
  Login
}
