interface ILogin {
  userName: string;
  password: string;
}

class Login implements ILogin {
  userName: string;
  password: string;

  constructor() {
    this.userName = "";
    this.password = "";
  }
}

export {
  ILogin,
  Login
}
